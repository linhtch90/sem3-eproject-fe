/* eslint-disable @typescript-eslint/no-var-requires */
import { useEffect, useState } from 'react';
import { Route, Routes, useParams } from 'react-router-dom';
const axios = require('axios').default;
//import { axios } from 'axios';
function ProjectDetail() {
  // let id = useParam();
  const [project, setProject] = useState([]);
  let id = useParams();

  let projectDetailUrl = `https://localhost:44302/api/Project/id?id=${id.projectId}`;

  useEffect(() => {
    axios({
      method: 'get',
      url: projectDetailUrl,
      headers: {
        Authorization: `Bearer  ${localStorage.getItem('token')}`,
      },
    }).then((response) => {
      let detail = response.data;
      setProject(detail);
    });
  }, [project]);

  return (
    <>
      {project.map((item, index) => (
        <div key={index}>{item.name} </div>
      ))}
    </>
  );
}
export default ProjectDetail;
