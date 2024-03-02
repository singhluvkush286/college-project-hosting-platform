import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { firestore } from '../firebase';

const ProjectDetails = () => {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const projectCollectionRef = collection(firestore, 'finalUpload');
        const querySnapshot = await getDocs(projectCollectionRef);

        querySnapshot.forEach((doc) => {
          if (doc.id === projectId) {
            setProject(doc.data());
          }
        });

        // If project not found
        if (!project) {
          console.log('No such project:', projectId);
          setProject(null);
        }
      } catch (error) {
        console.error('Error fetching project: ', error);
      }
    };

    fetchProject();
  }, [projectId]);

  return (
    <div>
      {project ? (
        <div>
          <h2>{project.title}</h2>
          <p>{project.description}</p>
          {/* Render additional project details as needed */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ProjectDetails;
