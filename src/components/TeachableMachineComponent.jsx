import React, { useRef, useState } from 'react';
import * as tmImage from '@teachablemachine/image';

const TeachableMachineComponent = () => {
  const imageRef = useRef(null);
  const [predictionResult, setPredictionResult] = useState('');
  const [uploadedImage, setUploadedImage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFileChange = async (event) => {
    try {
      const file = event.target.files[0];
      const reader = new FileReader();

      reader.onload = async (e) => {
        const imageSrc = e.target.result;
        setUploadedImage(imageSrc);
        setLoading(true);

        if (imageRef.current) {
          imageRef.current.src = imageSrc;

          // Run prediction
          const result = await predict(imageRef.current);
          setPredictionResult(result);
          setLoading(false);
        }
      };

      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Error handling file change:', error);
    }
  };

  const predict = async (image) => {
    try {
      const modelURL = 'https://teachablemachine.withgoogle.com/models/zP41LSBJa/model.json';
      const metadataURL = 'https://teachablemachine.withgoogle.com/models/zP41LSBJa/metadata.json';

      const model = await tmImage.load(modelURL, metadataURL);
      const prediction = await model.predict(image);

      const maxProbabilityIndex = prediction.reduce((maxIndex, current, currentIndex, arr) =>
        current.probability > arr[maxIndex].probability ? currentIndex : maxIndex, 0);

      const maxClass = prediction[maxProbabilityIndex].className;
      const maxProbability = prediction[maxProbabilityIndex].probability.toFixed(2);

      console.log(`${maxClass}: ${maxProbability}`);
      
      return `${maxClass}!`;
    } catch (error) {
      console.error('Error predicting:', error);
      return 'Error predicting';
    }
  };

  return (
    <div className='text-center mt-5 text-slate-300'>
      <input type="file" accept="image/*" onChange={handleFileChange} className=""/>
      {uploadedImage && <img ref={imageRef} src={uploadedImage} alt="Uploaded" className="mx-auto mt-10 mb-5 rounded-lg w-80 h-80 object-cover"/>}
      {loading && !predictionResult && <p>Loading...</p>}
      {predictionResult && <p className="text-3xl font-bold uppercase">{predictionResult}</p>}
    </div>
  );
};

export default TeachableMachineComponent;
