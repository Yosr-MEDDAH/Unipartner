from flask import Flask, jsonify, request
import numpy as np
import pandas as pd
from sklearn.preprocessing import MultiLabelBinarizer
from sklearn.neighbors import NearestNeighbors
from scipy.sparse import csr_matrix
import pickle

app = Flask(__name__)

# load model and data
model = pickle.load(open('artifacts/model.pkl', 'rb'))
users = pickle.load(open('artifacts/students.pkl', 'rb'))
skills_matrix = csr_matrix(pickle.load(open('artifacts/skills_matrix.pkl', 'rb')))

# define recommendation endpoint
@app.route('/recommend', methods=['POST'])
def recommend_student():
    users = pd.read_csv('data/students.csv', sep=',', encoding='latin-1', on_bad_lines='skip')
    users.rename(columns={
        "Student-ID": "student_id",
        "Skills": "skills",
        "Interests": "interests",
        "Red-Flags": "red_flags"
    }, inplace=True)

    users.fillna('', inplace=True)

    users['skills'] = users['skills'].apply(lambda x: x.split(','))
    users['interests'] = users['interests'].apply(lambda x: x.split(','))
    users['red_flags'] = users['red_flags'].apply(lambda x: x.split(','))

    mlb = MultiLabelBinarizer()
    skills_onehot = pd.DataFrame(mlb.fit_transform(users['skills']), columns=mlb.classes_)
    interests_onehot = pd.DataFrame(mlb.fit_transform(users['interests']), columns=mlb.classes_)
    red_flags_onehot = pd.DataFrame(mlb.fit_transform(users['red_flags']), columns=mlb.classes_)

    encoded_features = pd.concat([skills_onehot, interests_onehot, red_flags_onehot], axis=1)

    skills_matrix = csr_matrix(encoded_features)

    model = NearestNeighbors(algorithm='brute')
    model.fit(skills_matrix)

    pickle.dump(model, open('artifacts/model.pkl', 'wb'))
    pickle.dump(users['student_id'], open('artifacts/students_id.pkl', 'wb'))
    pickle.dump(users, open('artifacts/students.pkl', 'wb'))
    pickle.dump(skills_matrix, open('artifacts/skills_matrix.pkl', 'wb'))

    data = request.get_json()

    student_id = data.get('student_id', None) #getting the student_id key
    #errors and not found handling:

    if student_id is None:
        return jsonify({'error': 'Missing student_id parameter'}), 400

    if student_id not in users['student_id'].values:
        return jsonify({'error': f"Student with ID {student_id} not found."}), 404

    student_index = np.where(users['student_id'] == student_id)[0][0]
    current_student_red_flags = users.loc[student_index, 'red_flags']

    # find red flags to exclude
    exclude_red_flags = set(flag for flag in current_student_red_flags if
                            (users['interests'].apply(lambda x: flag in x)).sum() >= 1)

    # find students to exclude
    exclude_students = set()
    for index, row in users.iterrows():
        if any(flag in row['interests'] for flag in exclude_red_flags):
            exclude_students.add(row['student_id'])

    # find similar students using the model
    distance, suggestion = model.kneighbors(skills_matrix[student_index, :].reshape(1, -1), n_neighbors=len(users))

    # Calculate Jaccard similarity and sort recommended students in descending order
    def jaccard_similarity(set1, set2):
        intersection = len(set1.intersection(set2))
        union = len(set1.union(set2))
        return intersection / union if union != 0 else 0

    selected_student_skills = set(users.loc[student_index, 'skills'])
    recommended_students = []


    
    for i in range(len(suggestion)):
        similar_students = users['student_id'].iloc[suggestion[i]]
        for j in similar_students:
            if j not in exclude_students:
                recommended_students.append(j)
                
     # Sort recommended students by Jaccard similarity in descending order
    recommended_students.sort(key=lambda x: jaccard_similarity(selected_student_skills, set(users.loc[users['student_id'] == x, 'skills'].iloc[0])), reverse=True)

    return jsonify({'recommended_students': recommended_students})

if __name__ == '__main__':
    app.run(debug=True)
