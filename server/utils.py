import os
import subprocess
import whisper
import pickle
import numpy as np

model = whisper.load_model("tiny.en")

CACHE_PATH = './cache/'

def check_download_cache(video_id):
    return os.path.isfile(os.path.join(CACHE_PATH, video_id, video_id+'.mp4'))

def check_transcription_cache(video_id):
    return os.path.isfile(os.path.join(CACHE_PATH, video_id, video_id+'.pkl'))

def download(video_id):
    if check_download_cache(video_id):
        return os.path.join(CACHE_PATH, video_id, video_id+'.mp4')

    video_link = f"https://www.youtube.com/watch?v={video_id}"

    new_dir = os.path.join(CACHE_PATH, video_id)

    if not os.path.exists(new_dir):
        os.mkdir(new_dir)

    subprocess.run(['yt-dlp', video_link, '-f 18', video_link , '-o', os.path.join(new_dir, '%(id)s.%(ext)s')])

    return os.path.join(new_dir, f"{video_id}.mp4")

def transcribe(video_id):
    if check_transcription_cache(video_id):
        return os.path.join(CACHE_PATH, video_id, video_id+'.pkl')
    transcript_output = os.path.join(CACHE_PATH, video_id, video_id+'.pkl')
    result = model.transcribe(os.path.join(CACHE_PATH, video_id, video_id+'.mp4'), fp16=False)
    transcript = result['segments']
    start_vals = np.array([transcript[x]['start'] for x in range(len(transcript))])
    end_vals = np.array([transcript[x]['end'] for x in range(len(transcript))])
    segment_length = end_vals - start_vals
    text_segment = [transcript[x]['text'] for x in range(len(transcript))]
    result = {'starts':start_vals, 'ends':end_vals, 'lengths':segment_length, 'text':text_segment}

    with open(transcript_output, 'wb') as f:
        pickle.dump(result, f)
    return result

def load_transcript(video_id):
    if check_transcription_cache(video_id):
        with open(os.path.join(CACHE_PATH, video_id, video_id+'.pkl'), 'rb') as f:
            return pickle.load(f)
    else:
        return None




    
