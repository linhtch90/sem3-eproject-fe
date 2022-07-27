import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Card, Carousel, Col, Image, Row } from 'antd';

import { getAllProjects } from '../feature/project/ProjectSlice';
import imgLiving from '../image/img_living.jpg';
import imageLiving from '../image/living.jpeg';

import styles from '../css/Project.module.css';

function ProjectPage() {
  const dispatch = useDispatch();
  const storedProjects = useSelector((state) => state.projectReducer.projects);

  React.useEffect(() => {
    dispatch(getAllProjects());
  }, []);

  return (
    <>
      <div className={styles.project_released}>
        <Row>
          <Col s={24}>
            <h1> Project is about to be released.</h1>
          </Col>
        </Row>
        <Row className={styles.carousel_project_released}>
          <Col span="24">
            <Carousel autoplay>
              {storedProjects
                .filter((item) => item.status === 'upcoming')
                .map((project, index) => (
                  <div key={index}>
                    <div className={styles.upcoming_item}>
                      <Card className={styles.upcoming_card_item}>
                        <Row className={styles.upcoming_content_card}>
                          <Col span={12} className={styles.upcoming_img}>
                            <Image
                              className={styles.upcoming_img_item}
                              src="https://nhaxinhcenter.com.vn/source/pic/noi-that/NT182/noi-that-phong-khach-124.jpg"
                            />
                          </Col>
                          <Col span={12} className={styles.upcoming_content}>
                            <h3> Title :{project.name}</h3>
                            <p>Description : {project.description}</p>
                            <Button type="primary">
                              <Link to={`projectDetail/id?id=${project.id}`}> Detail </Link>
                            </Button>
                          </Col>
                        </Row>
                      </Card>
                    </div>
                  </div>
                ))}
            </Carousel>
          </Col>
        </Row>
      </div>
      {/* project ongoing */}
      <div className={styles.project_ongoing}>
        <h1 className={styles.title_ongoing}> On going project</h1>
        <Row>
          <Col span={12}>
            <Image className={styles.img_ongoing} src={imageLiving} />
          </Col>
          <Col span={12}>
            <Carousel autoplay dotPosition="right">
              {storedProjects
                .filter((item) => item.status === 'going')
                .map((project, index) => (
                  <div key={index}>
                    <div className={styles.contentStyle}>
                      <Card className={styles.card}>
                        <Image
                          className={styles.ongoing_image_card}
                          src="https://nhaxinhcenter.com.vn/source/pic/noi-that/NT182/noi-that-phong-khach-124.jpg"
                        />
                        <h3> Title : {project.name} </h3>
                        <p> Description : {project.description}</p>
                        <Button type="primary"> Detail</Button>
                      </Card>
                      ;
                    </div>
                  </div>
                ))}
            </Carousel>
          </Col>
        </Row>
      </div>
      {/* project finish */}
      <div className={styles.project_ongoing}>
        <h1 className={styles.title_ongoing}> On going project</h1>
        <Row>
          <Col span={12}>
            <Carousel autoplay dotPosition="left">
              {storedProjects
                .filter((item) => item.status === 'finish')
                .map((project, index) => (
                  <div key={index}>
                    <div className={styles.contentStyle}>
                      <Row justify="end" className={styles.item_card}>
                        <Card className={styles.card}>
                          <div>
                            <Image className={styles.ongoing_image_card} src={imgLiving} />
                          </div>
                          <div className={styles.card_content}>
                            <h3> Title : {project.name} </h3>
                            <p> Description : {project.description}</p>
                            <Button type="primary"> Detail</Button>
                          </div>
                        </Card>
                      </Row>
                    </div>
                  </div>
                ))}
            </Carousel>
          </Col>
          <Col span={12}>
            <Image className={styles.img_ongoing} src={imageLiving} />
          </Col>
        </Row>
      </div>
    </>
  );
}

export default ProjectPage;
