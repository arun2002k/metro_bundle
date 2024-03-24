from motor import motor_asyncio
import face_recognition
from PIL import Image
from keys import keys
import requests
from io import BytesIO

client = motor_asyncio.AsyncIOMotorClient(keys.getMongoURI())
db = client.metro_app
userCollection = db.users
faceCollection = db.faces
bookingsCollection = db.bookings

async def create(data):
    data = dict(data)
    try:
        await userCollection.insert_one(data)
        return True
    except:
        return False


async def get_all():
    reports = []
    response = userCollection.find({}, {"_id": 0})
    for document in await response.to_list(length=100):
        reports.append(document)
    return reports

async def get_all_faces():
    faces = []
    response = faceCollection.find({}, {"_id": 0})
    for document in await response.to_list(length=100):
        faces.append(document)
    return faces

async def processImage(userId, url):
    response = requests.get(url)
    with open("image.jpeg", "wb") as f:
        f.write(response.content)
    img = Image.open(BytesIO(response.content))
    image = face_recognition.load_image_file("image.jpeg")
    face_locations = face_recognition.face_locations(image)
    print(len(face_locations))
    for face_location in face_locations:
        face_encoding = face_recognition.face_encodings(
            image, [face_location])[0]
        face_data = {"face_id": face_encoding.tolist(), "user_id": userId}
        await faceCollection.insert_one(dict(face_data))
        return True
    return False

async def create_user(data):
    data = dict(data)
    try:
        await userCollection.insert_one(data)
        return True
    except:
        return False


async def get_user(data):
    users = []
    response = userCollection.find({"id": data}, {"_id": 0})
    for document in await response.to_list(length=100):
        users.append(document)
    return users

async def book_ticket(data):
    data = dict(data)
    try:
        await bookingsCollection.insert_one(data)
        return True
    except:
        return False