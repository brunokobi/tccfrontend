const cam = document.getElementById('cam')

function startVideo() {
    navigator.getUserMedia(
      { video: {} },
      stream => cam.srcObject = stream,
      err => console.error(err)
    )
  }

//parte do recolhecimento 
  const loadLabels = () => {
    const labels = ['Matheus Castiglioni','Lucas Barbosa','Bruno Kobi','Rafaela Kobi']
    //const labels = ['Bruno Kobi']
    return Promise.all(labels.map(async label => {
        const descriptions = []
        for (let i = 1; i <= 1; i++) {
            const img = await faceapi.fetchImage(`/assets/lib/face-api/labels/${label}/${i}.jpg`)
           // const img = await faceapi.fetchImage(`https://scontent.fvix1-1.fna.fbcdn.net/v/t31.0-8/12983896_10205539455718075_2440577530540952680_o.jpg?_nc_cat=108&_nc_sid=174925&_nc_ohc=K2p9-Krs3y4AX-5rZyH&_nc_ht=scontent.fvix1-1.fna&oh=912672f99e953fbb5271edb88358791c&oe=5F655A95`)
            const detections = await faceapi
                .detectSingleFace(img)
                .withFaceLandmarks()
                .withFaceDescriptor()
            descriptions.push(detections.descriptor)
        }
        return new faceapi.LabeledFaceDescriptors(label, descriptions)
    }))
}



Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromUri('/assets/lib/face-api/models'),
    faceapi.nets.faceLandmark68Net.loadFromUri('/assets/lib/face-api/models'),
    faceapi.nets.faceRecognitionNet.loadFromUri('/assets/lib/face-api/models'),
    faceapi.nets.faceExpressionNet.loadFromUri('/assets/lib/face-api/models'),
    faceapi.nets.ageGenderNet.loadFromUri('/assets/lib/face-api/models'),
    faceapi.nets.ssdMobilenetv1.loadFromUri('/assets/lib/face-api/models'),
]).then(startVideo)

cam.addEventListener('play', async () => {
    const canvas = faceapi.createCanvasFromMedia(cam)
    const canvasSize = {
        width: cam.width,
        height: cam.height
    }
    const labels = await loadLabels()
    faceapi.matchDimensions(canvas, canvasSize)
    document.body.appendChild(canvas)
    setInterval(async () => {
        const detections = await faceapi
            .detectAllFaces(
                cam,
                new faceapi.TinyFaceDetectorOptions()
            )
            .withFaceLandmarks()
            .withFaceExpressions()
            .withAgeAndGender()
            .withFaceDescriptors()
        const resizedDetections = faceapi.resizeResults(detections, canvasSize)
        const faceMatcher = new faceapi.FaceMatcher(labels,0.6)
        const results = resizedDetections.map(d =>
            faceMatcher.findBestMatch(d.descriptor)
        )
        canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
        faceapi.draw.drawDetections(canvas, resizedDetections)
      // faceapi.draw.drawFaceLandmarks(canvas, resizedDetections)
       // faceapi.draw.drawFaceExpressions(canvas, resizedDetections)
        resizedDetections.forEach(detection => {
            const { age, gender, genderProbability } = detection           
            new faceapi.draw.DrawTextField([
                `${parseInt(age, 10)} anos`,
                `${gender=="male"?"homem":"mulher"} `
            ], detection.detection.box.topRight).draw(canvas)
        })
        results.forEach((result, index) => {
            const box = resizedDetections[index].detection.box
            const { label, distance } = result
            const nome = "";
            const data = new Date();
            const cont = 0.00;
            
            if (distance * 100 > 50 && this.nome!=label&&label!='unknown'){ 
                 this.nome = label;
                 console.log(this.nome);
                 console.log(data);
                 console.log(distance * 100);               
            }          
           

            new faceapi.draw.DrawTextField([
                `${label} `
            ], box.bottomRight).draw(canvas)
        })
    }, 100)
})

//probalidade do sexo
//(${parseInt(genderProbability * 100, 10)})

//probilidade de ser a pessoa
//(${parseInt(distance * 100, 10)})

