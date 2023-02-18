from fastapi import FastAPI, BackgroundTasks
from pydantic import BaseModel
import asyncio
from utils import download, transcribe
from search import SearchHandler
from videos import get_videos
from fastapi.middleware.cors import CORSMiddleware

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

search_handler = SearchHandler()

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
    urls = get_videos(start_time, time, video_id)
    return {"urls": urls}

    



