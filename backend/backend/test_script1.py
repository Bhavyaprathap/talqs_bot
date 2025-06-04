# test_script.py

from transformers import pipeline

# Load the summarization model once (use a model appropriate for your task)
summarizer = pipeline("summarization", model="sshleifer/distilbart-cnn-12-6")  # You can replace with your custom model

def summarize_text(text):
    """
    Summarizes the given text using the loaded transformer model.
    Automatically chunks if the text is too long.
    """
    max_input_length = 1024  # BART's input limit in tokens (approx)
    
    # If text is too long, chunk it (optional basic logic)
    if len(text) > 3000:
        chunks = [text[i:i+1000] for i in range(0, len(text), 1000)]
        summaries = [summarizer(chunk, max_length=150, min_length=40, do_sample=False)[0]['summary_text'] for chunk in chunks]
        return " ".join(summaries)
    
    # For shorter input
    summary = summarizer(text, max_length=150, min_length=40, do_sample=False)
    return summary[0]['summary_text']
