import pandas as pd
import numpy as np
from sklearn.preprocessing import MultiLabelBinarizer
from sklearn.neighbors import NearestNeighbors
from scipy.sparse import csr_matrix
import pickle

students = pd.read_csv('data/students.csv', sep=',', encoding='latin-1', on_bad_lines='skip')
students.head(30)
students.columns
students.rename(columns={
    "Student-ID": "student_id",
    "Skills": "skills",
    "Interests": "interests",
    "Red-Flags": "red_flags"
}, inplace=True)
students.head()
students.fillna('', inplace=True)
students.head()
students['skills'] = students['skills'].apply(lambda x: x.split(','))
students['interests'] = students['interests'].apply(lambda x: x.split(','))
students['red_flags'] = students['red_flags'].apply(lambda x: x.split(','))
print(students.sample(2))
mlb = MultiLabelBinarizer()
skills_onehot = pd.DataFrame(mlb.fit_transform(students['skills']), columns=mlb.classes_)
interests_onehot = pd.DataFrame(mlb.fit_transform(students['interests']), columns=mlb.classes_)
red_flags_onehot = pd.DataFrame(mlb.fit_transform(students['red_flags']), columns=mlb.classes_)
interests_onehot
encoded_features = pd.concat([skills_onehot, interests_onehot, red_flags_onehot], axis=1)
skills_matrix = csr_matrix(encoded_features)
model = NearestNeighbors(algorithm='brute')
model.fit(skills_matrix)
pickle.dump(model, open('artifacts/model.pkl', 'wb'))
pickle.dump(students['student_id'], open('artifacts/students_id.pkl', 'wb'))
pickle.dump(students, open('artifacts/students.pkl', 'wb'))
def recommend_student(student_id):
    if student_id not in students['student_id'].values:
        print(f"Student with ID {student_id} not found.")
        return

    student_index = np.where(students['student_id'] == student_id)[0][0]
    current_student_red_flags = students.loc[student_index, 'red_flags']
    
    # Find red flags to exclude
    exclude_red_flags = set(flag for flag in current_student_red_flags if 
                            (students['interests'].apply(lambda x: flag in x)).sum() >= 3)
    
    # Find students to exclude
    exclude_students = set()
    for index, row in students.iterrows():
        if any(flag in row['interests'] for flag in exclude_red_flags):
            exclude_students.add(row['student_id'])
    
    # Find similar students using the model
    distance, suggestion = model.kneighbors(skills_matrix[student_index, :].reshape(1, -1), n_neighbors=2)
    
    # Print recommended student IDs, excluding those with common red_flags
    for i in range(len(suggestion)):
        similar_students = students['student_id'].iloc[suggestion[i]]
        for j in similar_students:
            if j not in exclude_students:
                print(j)
student_id_to_recommend = "65787026f9984c068f184133"
recommend_student(student_id_to_recommend)