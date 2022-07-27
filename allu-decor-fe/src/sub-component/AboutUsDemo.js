import React from 'react';

import styles from '../css/AboutUS.module.css';

const AboutUsDemo = () => {
  return (
    <>
      <div className={styles.Container}>
        <div className={styles.Content}>
          <div className={styles.Contact}>
            <div className={styles.contact__slideShow}></div>
            <div className={styles.contact__infoCompany}>
              <div className={styles.contact__info__text}>
                <h1 className={styles.title}> 1 . Giới thiệu về công ty </h1>
                <p className={styles.info__content}>
                  Lorem Ipsum, dizgi ve baskı endüstrisinde kullanılan mıgır metinlerdir. Lorem Ipsum, adı bilinmeyen
                  bir matbaacının bir hurufat numune kitabı oluşturmak üzere bir yazı galerisini alarak karıştırdığı
                  lerden beri endüstri standardı sahte metinler olarak kullanılmıştır. Beşyüz yıl boyunca varlığını
                  sürdürmekle kalmamış, aynı zamanda pek değişmeden elektronik dizgiye de sıçramıştır. larda Lorem Ipsum
                  pasajları da içeren Letraset yapraklarının yayınlanması ile ve yakın zamanda Aldus PageMaker gibi
                  Lorem Ipsum sürümleri içeren m asaüstü yayıncılık yazılımları ile popüler olmuştur.
                </p>
              </div>
              <div className={styles.contact__info__image}>
                <img className={styles.image_Company} src="../image/company.jpg" alt="company" />
              </div>
            </div>
            <div className={styles.saparetor}></div>

            <div className={styles.infoService}>
              <div className={styles.infoService__text}>
                <h1 className={styles.title}> 2 . Một số hình ảnh về dịch vụ của công ty </h1>
              </div>
              <div className={styles.infoService__image}>
                <div className={styles.infoService_item}>
                  <img className={styles.image__service} src="../image/1.jpeg" alt="4" />
                </div>
                <div className={styles.infoService_item}>
                  <img className={styles.image__service} src="../image/2.jpeg" alt="5" />
                </div>
                <div className={styles.infoService_item}>
                  <img className={styles.image__service} src="../image/3.jpeg" alt="6" />
                </div>
                <div className={styles.infoService_item}>
                  <img className={styles.image__service} src="../image/4.jpeg" alt="7" />
                </div>
              </div>
              <div className={styles.infoService__image}>
                <div className={styles.infoService_item}>
                  <img className={styles.image__service} src="../image/5.jpeg" alt="4" />
                </div>
                <div className={styles.infoService_item}>
                  <img className={styles.image__service} src="../image/6.jpeg" alt="5" />
                </div>
                <div className={styles.infoService_item}>
                  <img className={styles.image__service} src="../image/7.jpeg" alt="6" />
                </div>
                <div className={styles.infoService_item}>
                  <img className={styles.image__service} src="../image/8.jpeg" alt="7" />
                </div>
              </div>
            </div>
            <div className={styles.saparetor}></div>

            <div className={styles.descriptionService}>
              <div className={styles.service__kitchen}>
                <h3 className={styles.title}> 1. Dịch vụ phòng bếp .</h3>
                <p className={styles.detail}>
                  Lorem Ipsum, dizgi ve baskı endüstrisinde kullanılan mıgır metinlerdir. Lorem Ipsum, adı bilinmeyen
                  bir matbaacının bir hurufat numune kitabı oluşturmak üzere bir yazı galerisini alarak karıştırdığı
                  lerden beri endüstri standardı sahte metinler olarak .
                </p>
              </div>
              <div className={styles.service__livingroom}>
                <h3 className={styles.title}> 2 . Dịch vụ phòng khách .</h3>
                <p className={styles.detail}>
                  Lorem Ipsum, dizgi ve baskı endüstrisinde kullanılan mıgır metinlerdir. Lorem Ipsum, adı bilinmeyen
                  bir matbaacının bir hurufat numune kitabı oluşturmak üzere bir yazı galerisini alarak karıştırdığı
                  lerden beri endüstri standardı sahte metinler olarak .
                </p>
              </div>
              <div className={styles.service__hall}>
                <h3 className={styles.title}>3 . Dịch vụ phòng hội trường .</h3>
                <p className={styles.detail}>
                  Lorem Ipsum, dizgi ve baskı endüstrisinde kullanılan mıgır metinlerdir. Lorem Ipsum, adı bilinmeyen
                  bir matbaacının bir hurufat numune kitabı oluşturmak üzere bir yazı galerisini alarak karıştırdığı
                  lerden beri endüstri standardı sahte metinler olarak .
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutUsDemo;
