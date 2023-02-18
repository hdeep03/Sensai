from fastapi import FastAPI, BackgroundTasks
from pydantic import BaseModel
import asyncio
from utils import download, transcribe
from search import SearchHandler

app = FastAPI()

class VideoID(BaseModel):
    id: str
class SearchQuery(BaseModel):
    id: str
    query: str

search_handler = SearchHandler()

@app.post("/api/v0/search")
async def search(sq: SearchQuery):
    video_id = sq.id
    query = sq.query
    starts, contexts = search_handler.search(query, video_id)
    return {"starts": starts, "contexts": contexts}
    


@app.post("/api/v0/process")
async def process(video: VideoID):
    video_id = video.id
    path = download(video_id)                       # Downloads a youtube video
    transcript = transcribe(video_id)               # Transcribes the video
    return {"Transcript Status": "Success"}




