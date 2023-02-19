from fastapi import FastAPI, BackgroundTasks
from pydantic import BaseModel
from quiz import generate_quiz
from utils import download, transcribe
from search import SearchHandler
from videos import get_videos,get_keywords
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from questions import answer_question
from notes import create_notes_pdf
from fastapi.staticfiles import StaticFiles
app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class VideoID(BaseModel):
    id: str
class SearchQuery(BaseModel):
    id: str
    query: str
class SuppVideoQuery(BaseModel):
    id: str
    timestamp: str
class QuizRequest(BaseModel):
    id: str
    difficulty: str
    quiz_type:str

class Query(BaseModel):
    query: str

search_handler = SearchHandler()


app.mount("/static", StaticFiles(directory="static"), name="static")

@app.post("/api/v0/search")
def search(sq: SearchQuery):
    video_id = sq.id
    query = sq.query
    starts, contexts = search_handler.search(query, video_id)
    return {"starts": starts, "contexts": contexts}

@app.post("/api/v0/process")
def process(video: VideoID):
    video_id = video.id
    path = download(video_id)                       # Downloads a youtube video
    transcript = transcribe(video_id)               # Transcribes the video
    return {"Transcript Status": "Success"}

@app.post("/api/v0/videos")
def videos(svq: SuppVideoQuery):
    video_id = svq.id
    time = int(svq.timestamp)
    start_time = max(0, time-240)
    time = max(start_time+60, time)
    urls = get_videos(start_time, time, video_id)
    return {"urls": urls}

@app.post("/api/v0/quiz")
def quiz(qr: QuizRequest):
    video_id = qr.id
    diff = qr.difficulty
    quiz_type = qr.quiz_type
    path, generated_quiz = generate_quiz(video_id, diff, quiz_type)
    if generated_quiz is None:
        return {"quiz": "Error"}, 422
    return path

@app.post("/api/v0/question")
def question(sq: Query):
    query = sq.query
    return {"answer": answer_question(query)}
    
@app.post("/api/v0/notes")
def notes(video: VideoID):
    video_id = video.id
    notes = create_notes_pdf(video_id)
    return notes

@app.post("/api/v0/keywords")
def keywords(video: VideoID):
    video_id = video.id
    keywords = get_keywords(video_id)
    print(keywords)
    return {"keywords": keywords}