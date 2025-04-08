# from flask import Flask, request, jsonify
# from flask_cors import CORS
# from transformers import pipeline

# app = Flask(__name__)
# CORS(app)

# # Load your question-answering model
# qa_pipeline = pipeline("question-answering", model="deepset/roberta-base-squad2")

# @app.route('/api/ask', methods=['POST'])
# def ask():
#     data = request.get_json()
#     question = data.get('question')
#     context = data.get('context')

#     if not question or not context:
#         return jsonify({'error': 'Missing question or context'}), 400

#     try:
#         result = qa_pipeline(question=question, context=context)
#         return jsonify(result)
#     except Exception as e:
#         return jsonify({'error': str(e)}), 500

# if __name__ == '__main__':
#     app.run(debug=True)
