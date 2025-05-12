from flask import Flask, jsonify, request
import numpy as np
import pandas as pd
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

    # get recommended student ids excluding those with common red_flags
    recommended_students = []
    for i in range(len(suggestion)):
        similar_students = users['student_id'].iloc[suggestion[i]]
        for j in similar_students:
            if j not in exclude_students:
                recommended_students.append(j)

    return jsonify({'recommended_students': recommended_students})

if __name__ == '__main__':
    app.run(debug=True)
