import openai
from transformers import GPT2TokenizerFast
import os
from utils import load_transcript
import re
from reportlab.platypus import SimpleDocTemplate
from reportlab.lib.pagesizes import letter
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfgen import canvas
from reportlab.pdfbase.ttfonts import TTFont
from textwrap import wrap
pdfmetrics.registerFont(TTFont('Vera', 'Vera.ttf'))
pdfmetrics.registerFont(TTFont('VeraBd', 'VeraBd.ttf'))
pdfmetrics.registerFont(TTFont('VeraIt', 'VeraIt.ttf'))
pdfmetrics.registerFont(TTFont('VeraBI', 'VeraBI.ttf'))



n = 3000
openai.api_key = "sk-ua7fvqmkIB0oVWBqefTtT3BlbkFJL4DaQp94w2GO98jQuQ2"
tokenizer = GPT2TokenizerFast.from_pretrained("gpt2")

CACHE_PATH = './cache/'


def generate_shards(transcript):
    segments = transcript['text']
    shards = []
    while len(segments) > 0:
        temp = 0
        shard = ""
        while temp < n and len(segments) > 0:
            shard += segments.pop(0)
            temp += len(tokenizer.encode(shard))
        shards.append(shard)
    return shards

def generate_text_notes(video_id):
    transcript = load_transcript(video_id)
    shards = generate_shards(transcript)
    print(shards)
    output_lines = []
    for shard in shards:
        try:
            davinci3 = openai.Completion.create(model="text-davinci-003", 
                                            prompt=f"take notes on the following sentences using '*-' as a bullet point: \n\n{shard}",
                                            max_tokens=3000)
        except Exception:
            print(Exception)
        shard_notes = davinci3.choices[0].text
        for line in shard_notes.split("\n"):
            if re.match("^\*-\s?\w.+$",line):
                output_lines.append(re.sub("\*-\s?","- ",line))
            else:
                print("discarded:",line)
    return "\n".join(output_lines)


def create_notes_pdf(video_id):
    notes = generate_text_notes(video_id)
    path = os.path.join(CACHE_PATH, video_id, video_id+'_notes.pdf')
    c = canvas.Canvas(path, pagesize=letter)
    c.setFont('Vera', 12)
    t = c.beginText()

    t.setTextOrigin(50, 700)
    
    temp_line = notes.split('\n')
    fin = []
    for line in temp_line:
        if line != '':
            fin.append("\n".join(wrap(line, 80)))
    out = "\n".join(fin)
    print(out)
    t.textLines(out)
    c.drawText(t)
    c.showPage()
    c.save()
    return path



if __name__ == "__main__":
    print(generate_text_notes('f079K1f2WQk'))