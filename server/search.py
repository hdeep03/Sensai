from sentence_transformers import CrossEncoder
from utils import load_transcript
import numpy as np

class SearchHandler():
    def __init__(self, model_name='cross-encoder/ms-marco-MiniLM-L-12-v2'):
        self.model = CrossEncoder(model_name)

    def search(self, query, video_id, k=5):
        transcript = load_transcript(video_id)
        if transcript is None:
            return None
        else:
            scores = self.model.predict([(query, x) for x in transcript['text']])
        starts = []
        ctxts = []
        for x in np.argsort(scores)[:-(k+1):-1]:
            starts.append(transcript['starts'][x])
            ctxts.append(transcript['text'][x])
        return starts, ctxts

        

