from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
from io import BytesIO
import torch
from transformers import GPT2Tokenizer
from reportlab.lib.pagesizes import LETTER
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import Paragraph, SimpleDocTemplate, Spacer
from reportlab.lib.enums import TA_CENTER
from reportlab.lib.units import inch
from reportlab.lib import colors
import bcrypt
import jwt
import datetime
import time
import os
from dotenv import load_dotenv
from database import users_collection  # Import your GPT-based model
from TALQS_utils import text_to_token_ids, token_ids_to_text, generate_text_simple, GPTModel  # Utility functions
import re
from sumamry.test_script import summarize_text
import requests
from test_script1 import summarize_text
load_dotenv()
SECRET_KEY = os.getenv("SECRET_KEY")



# from your_model import model, tokenizer, text_to_token_ids, generate_text_simple, token_ids_to_text, BASE_CONFIG
from urllib.parse import urlparse

app = Flask(__name__)
CORS(app)


load_dotenv()  # Load environment variables from .env
from flask import Flask, request, jsonify
import requests
import os
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
LEGAL_KEYWORDS = [
    # General Legal Terms
    "law", "legal", "constitution", "court", "judgment", "case", "act", "clause",
    "statute", "regulation", "ordinance", "rule", "bylaw", "amendment","section","498A","FIR","article",
    
    # Legal Proceedings & Documents
    "litigation", "jurisdiction", "trial", "hearing", "appeal", "verdict", "sentence",
    "ruling", "injunction", "writ", "petition", "affidavit", "summons", "subpoena",
    "decree", "order", "plea", "charge", "indictment", "brief", "motion", "transcript","pocso","370",

    # Participants in Legal System
    "plaintiff", "defendant", "accused", "respondent", "appellant", "complainant",
    "petitioner", "witness", "judge", "justice", "jury", "advocate", "lawyer",
    "counsel", "barrister", "solicitor", "prosecutor", "attorney", "notary",

    # Legal Areas
    "criminal", "civil", "constitutional", "corporate", "commercial", "family",
    "property", "labour", "environmental", "administrative", "contract", 
    "intellectual property", "tax", "tort", "maritime", "international", "banking",

    # Law Enforcement & Criminal Procedure
    "evidence", "F.I.R", "investigation", "prosecution", "bail", "remand", "arrest",
    "custody", "detention", "confession", "search", "seizure", "charge sheet",
    "forensic", "warrant", "interrogation", "criminal record", "parole", "probation",

    # Punishment & Remedies
    "penalty", "fine", "imprisonment", "life sentence", "death penalty",
    "compensation", "damages", "restitution", "punitive damages", "injunction",
    "declaratory relief", "specific performance",

    # Legal Principles & Doctrines
    "habeas corpus", "res judicata", "stare decisis", "mens rea", "actus reus",
    "burden of proof", "presumption of innocence", "natural justice", "due process",
    "equity", "precedent", "ratio decidendi", "obiter dicta",

    # Contracts and Business Law
    "offer", "acceptance", "consideration", "breach", "indemnity", "guarantee",
    "arbitration", "negotiation", "mediation", "settlement", "clause", "agreement",
    "license", "non-disclosure", "confidentiality", "franchise", "partnership",

    # Human Rights & Public Law
    "human rights", "fundamental rights", "freedom", "liberty", "equality",
    "discrimination", "privacy", "censorship", "asylum", "refugee", "dignity",
    "civil liberties", "minority rights",

    # Property & Inheritance
    "ownership", "possession", "title", "lease", "mortgage", "tenancy",
    "easement", "succession", "inheritance", "will", "testament", "trust", "estate",

    # Corporate and Economic Law
    "merger", "acquisition", "antitrust", "insolvency", "bankruptcy", "shareholder",
    "director", "audit", "securities", "stock", "dividend", "liability", "fiduciary",

    # Miscellaneous
    "tribunal", "ombudsman", "compliance", "enactment", "ratification",
    "jurisprudence", "codification", "legal opinion", "case law", "statutory",
    "ultra vires", "legal aid", "amicus curiae", "precedent", "injury", "negligence"
]

def is_legal_question(question):
    question_lower = question.lower()
    return any(keyword in question_lower for keyword in LEGAL_KEYWORDS)



SERP_API_KEY = "94e3aa53219377b280f8bdb4d24e052d0536193241b57acc1771b1e61a7325d2"

@app.route('/api/search', methods=['POST'])
def search():
    data = request.get_json()
    question = data.get('question')

    if not question:
        return jsonify({"answer": "No question provided"}), 400
    
    if not is_legal_question(question):
        time.sleep(10)  # 10-second delay for non-legal
        return jsonify({"answer": "Only legal-related questions are allowed."}), 403


  

    try:
        params = {
        "q": question,
        "api_key": SERP_API_KEY,
        "engine": "google"
    }

        response = requests.get("https://serpapi.com/search.json", params=params)
        response.raise_for_status()  # Raises an HTTPError for bad responses
        results = response.json()
        answer = results.get("organic_results", [{}])[0].get("snippet", "No answer found.")
        time.sleep(2)
        
        return jsonify({"answer": answer})
    except requests.exceptions.RequestException as e:
        return jsonify({"answer": f"Search error: {str(e)}"}), 500
    except Exception as e:
        return jsonify({"answer": f"Server error: {str(e)}"}), 500


@app.route('/api/summarize', methods=['POST'])
def summarize():
    data = request.get_json()
    text = data.get('text')

    if not text or not text.strip():
        return jsonify({"summary": "No text provided"}), 400

    try:
        summary = summarize_text(text)
        time.sleep(10)
        return jsonify({"summary": summary})
    except Exception as e:
        return jsonify({"summary": f"Summarization error: {str(e)}"}), 500



# Load GPT model and tokenizer
tokenizer = GPT2Tokenizer.from_pretrained("gpt2")
MODEL_PATH = "gpt2-medium355M-sft.pth"  # Update with the actual model path
BASE_CONFIG = {
    "vocab_size": 50257,
    "context_length": 1024,
    "drop_rate": 0.0,
    "qkv_bias": True,
    "emb_dim": 1024,
    "n_layers": 24,
    "n_heads": 16,
}

model = GPTModel(BASE_CONFIG)
model.load_state_dict(torch.load(MODEL_PATH, map_location=torch.device("cpu")))
model.eval()

# ----------- LEGAL QA ENDPOINT (GPT-based) -----------
# @app.route("/ask", methods=["POST"])
# def ask_question():
#     data = request.get_json()
#     question = data.get("question", "")

#     if not question:
#         return jsonify({"answer": "⚠ Please provide a question."}), 400

#     token_ids = text_to_token_ids(question, tokenizer).to("cpu")

#     with torch.no_grad():
#         generated_ids = generate_text_simple(model, token_ids, max_new_tokens=64, context_size=BASE_CONFIG["context_length"])

#     generated_text = token_ids_to_text(generated_ids, tokenizer)

#     # Remove instruction headers using regex
#     response_text = re.sub(r"### Instruction:.*?\n?", "", generated_text).strip()

#     return jsonify({"answer": response_text})

# ----------- NDA PDF GENERATION -----------
@app.route("/generate_nda_pdf", methods=["POST"])
def generate_nda_pdf():
    data = request.get_json()
    disclosing_party = data.get("disclosingParty", "")
    receiving_party = data.get("receivingParty", "")
    date = data.get("date", "")
    purpose = data.get("purpose", "")

    buffer = BytesIO()
    doc = SimpleDocTemplate(buffer, pagesize=LETTER, rightMargin=72, leftMargin=72, topMargin=72, bottomMargin=72)

    styles = getSampleStyleSheet()
    bold_center = ParagraphStyle(name="BoldCenter", parent=styles["Heading1"], alignment=TA_CENTER)

    elements = [
        Paragraph("NON-DISCLOSURE AGREEMENT", bold_center),
        Spacer(1, 12),
        Paragraph(f"This Non-Disclosure Agreement is entered into on {date}, by and between {disclosing_party} and {receiving_party}."),
        Paragraph("Confidential information includes business processes, client details, and any proprietary data."),
    ]

    def draw_border(canvas, doc):
        canvas.saveState()
        canvas.setStrokeColor(colors.blue)
        canvas.setLineWidth(3)
        canvas.rect(40, 40, doc.width + 64, doc.height + 64)
        canvas.restoreState()

    doc.build(elements, onFirstPage=draw_border, onLaterPages=draw_border)
    buffer.seek(0)

    return send_file(buffer, as_attachment=True, download_name="NDA_Document.pdf", mimetype="application/pdf")

# ----------- AUTHENTICATION -----------
@app.route("/signup", methods=["POST"])
def signup():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    if users_collection.find_one({"email": email}):
        return jsonify({"message": "User already exists"}), 400

    hashed_password = bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt())
    users_collection.insert_one({"email": email, "password": hashed_password})

    return jsonify({"message": "Signup successful"}), 201

@app.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    user = users_collection.find_one({"email": email})
    if user and bcrypt.checkpw(password.encode("utf-8"), user["password"]):
        token = jwt.encode({"email": email, "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=1)}, SECRET_KEY, algorithm="HS256")
        return jsonify({"message": "Login successful", "token": token, "user": email}), 200

    return jsonify({"message": "Invalid credentials"}), 401

@app.route("/verify-token", methods=["POST"])
def verify_token():
    data = request.get_json()
    token = data.get("token", "")

    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
        return jsonify({"valid": True, "email": payload["email"]}), 200
    except jwt.ExpiredSignatureError:
        return jsonify({"valid": False, "error": "Token expired"}), 401
    except jwt.InvalidTokenError:
        return jsonify({"valid": False, "error": "Invalid token"}), 401

@app.route("/test-db")
def test_db():
    try:
        users = list(users_collection.find())
        return jsonify({"success": True, "users": [u["email"] for u in users]}), 200
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500
  # make sure this import points to your summarization file

# @app.route("/summarize", methods=["POST"])
# def summarize():
#     if 'file' in request.files:
#         file = request.files['file']
#         input_text = file.read().decode("utf-8")
#     else:
#         data = request.get_json()
#         input_text = data.get("text", "")

#     if not input_text.strip():
#         return jsonify({"summary": "⚠ Please provide valid input text."}), 400

#     try:
#         summary = summarize_text(input_text)
#         return jsonify({"summary": summary})
#     except Exception as e:
#         return jsonify({"summary": f"❌ Error during summarization: {str(e)}"}), 500

if __name__ == "__main__":
    app.run(debug=True, port=5000)
    app.run(debug=True)
