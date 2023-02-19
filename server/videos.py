import numpy as np
from utils import load_transcript
import yake
from youtubesearchpython import VideosSearch
import string

def findStart(start, transcript):
    if start == 0:
        return 0
    for i, seg_start in enumerate(transcript['starts']):
        if seg_start > start:
            return i - 1
    return len(transcript['starts']) - 1

def findEnd(end, transcript):
    if transcript is None:
        return -1
    for i, seg_end in enumerate(transcript['ends']):
        if seg_end > end:
            return i
    return len(transcript['starts']) - 1

def getSnippet(start, end, video_id):
    transcript = load_transcript(video_id)
    start_idx = findStart(start, transcript)
    end_idx = findEnd(end, transcript)
    snippet = " ".join(transcript['text'][start_idx:end_idx])
    return snippet

def extract_keywords(text):
    kw_extractor = yake.KeywordExtractor()
    keywords = kw_extractor.extract_keywords(text)
    return keywords

def get_videos(start, end, video_id, k=3):
    snippet = getSnippet(start, end, video_id).strip()
    snippet = "".join(x for x in snippet if x in string.printable)
    print(snippet)
    keywords = extract_keywords(snippet)
    print(keywords)
    query = " ".join([keywords[x][0] for x in range(3)])
    videosSearch = VideosSearch(query, limit = 10)
    d = videosSearch.result()
    urls = []
    for item in d['result']:
        urls.append(item['id'])
    return urls

def get_keywords(video_id):
    transcript = load_transcript(video_id)
    text = " ".join(transcript['text'])
    keywords = extract_keywords(text)
    return [keywords[0][0], keywords[1][0]]