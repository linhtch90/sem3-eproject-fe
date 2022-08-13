import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Card, Carousel, Col, Image, Row, Typography } from 'antd';

import { getAllProjects } from '../feature/project/ProjectSlice';
import comingProjectSideImage from '../images/project/coming_project_side_pic.webp';
import finishProjectSideImage from '../images/project/finish_project_side_pic.webp';
import goingProjectSideImage from '../images/project/ongoing_project_sie_pic.webp';

import styles from '../css/Project.module.css';

const { Title } = Typography;

function ProjectPage() {
  const dispatch = useDispatch();
  const storedProjects = useSelector((state) => state.projectReducer.projects);

  React.useEffect(() => {
    dispatch(getAllProjects());
  }, []);

  return (
    <Col style={{ margin: 'auto', width: '80%', marginBottom: '8rem' }}>
      <Row justify="center" style={{ marginTop: '4rem', marginBottom: '2rem' }}>
        <Col>
          <Title
            style={{
              color: '#076678',
              fontSize: '4rem',
              fontWeight: 'bolder',
              textAlign: 'left',
              textShadow: '6px 6px 0px rgba(131,165,152,0.7)',
            }}
          >
            Coming Projects
          </Title>
        </Col>
      </Row>
      <Row className={styles.carousel_project_released} justify="center" align="middle">
        <Col span={12}>
          <Carousel autoplay>
            {storedProjects
              .filter((item) => item.status === 'upcoming')
              .map((project, index) => (
                <div key={index} style={{ background: 'white' }}>
                  <Card className={styles.upcoming_card_item}>
                    <Row className={styles.upcoming_content_card}>
                      <Col span={12} className={styles.upcoming_img}>
                        <Image className={styles.upcoming_img_item} src={project.image} />
                      </Col>
                      <Col span={12} className={styles.upcoming_content}>
                        <h2>{project.name}</h2>
                        <p>{project.description}</p>
                        {/* <Button type="primary">
                          <Link to={`projectDetail/id?id=${project.id}`}> Detail </Link>
                        </Button> */}
                      </Col>
                    </Row>
                  </Card>
                </div>
              ))}
          </Carousel>
        </Col>
        <Col span={12}>
          <img
            style={{
              width: '80%',
              boxShadow: '10px 10px 0px rgba(131,165,152,0.7)',
              borderStyle: 'solid',
              borderWidth: '1px',
              borderColor: 'rgba(131,165,152,0.7)',
              marginLeft: '1rem',
            }}
            src={comingProjectSideImage}
          />
        </Col>
      </Row>

      {/* project ongoing */}

      <Row justify="center" style={{ marginTop: '4rem', marginBottom: '2rem' }}>
        <Col>
          <Title
            style={{
              color: '#076678',
              fontSize: '4rem',
              fontWeight: 'bolder',
              textAlign: 'left',
              textShadow: '6px 6px 0px rgba(131,165,152,0.7)',
            }}
          >
            Ongoing Projects
          </Title>
        </Col>
      </Row>
      <Row justify="center" align="middle">
        <Col span={12}>
          <img
            style={{
              width: '80%',
              boxShadow: '10px 10px 0px rgba(131,165,152,0.7)',
              borderStyle: 'solid',
              borderWidth: '1px',
              borderColor: 'rgba(131,165,152,0.7)',
              marginLeft: '1rem',
            }}
            src={goingProjectSideImage}
          />
        </Col>
        <Col span={12}>
          <Carousel autoplay>
            {storedProjects
              .filter((item) => item.status === 'going')
              .map((project, index) => (
                <div key={index} style={{ background: 'white' }}>
                  <Card className={styles.card}>
                    <Image className={styles.ongoing_image_card} src={project.image} />
                    <h2>{project.name} </h2>
                    <p>{project.description}</p>
                    {/* <Button type="primary"> Detail</Button> */}
                  </Card>
                </div>
              ))}
          </Carousel>
        </Col>
      </Row>

      {/* project finish */}

      <Row justify="center" style={{ marginTop: '4rem', marginBottom: '2rem' }}>
        <Col>
          <Title
            style={{
              color: '#076678',
              fontSize: '4rem',
              fontWeight: 'bolder',
              textAlign: 'left',
              textShadow: '6px 6px 0px rgba(131,165,152,0.7)',
            }}
          >
            Completed Projects
          </Title>
        </Col>
      </Row>
      <Row justify="center" align="middle">
        <Col span={12}>
          <Carousel autoplay>
            {storedProjects
              .filter((item) => item.status === 'finish')
              .map((project, index) => (
                <div key={index} style={{ background: 'white' }}>
                  <Row justify="end">
                    <Card className={styles.card}>
                      <div>
                        <Image className={styles.ongoing_image_card} src={project.image} />
                      </div>
                      <div className={styles.card_content}>
                        <h2>{project.name} </h2>
                        <p>{project.description}</p>
                        {/* <Button type="primary"> Detail</Button> */}
                      </div>
                    </Card>
                  </Row>
                </div>
              ))}
          </Carousel>
        </Col>
        <Col span={12}>
          <img
            src={finishProjectSideImage}
            style={{
              width: '80%',
              boxShadow: '10px 10px 0px rgba(131,165,152,0.7)',
              borderStyle: 'solid',
              borderWidth: '1px',
              borderColor: 'rgba(131,165,152,0.7)',
              marginLeft: '1rem',
            }}
          />
        </Col>
      </Row>
    </Col>
  );
}

export default ProjectPage;
