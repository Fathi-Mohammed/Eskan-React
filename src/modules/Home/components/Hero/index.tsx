import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Image } from '@/shared/components';
import styles from './styles.module.scss';
import { Skeleton } from 'antd';

type props = {
  data: {
    title: string;
    description: string;
    image: string;
  };
};

export const Hero: React.FC<props> = ({
  data: { title, description, image },
}) => {
  const { t } = useTranslation();

  return (
    <main className={styles.hero}>
      <Container>
        <Row className="row_modify with_row_gap items_center__">
          <Col lg={6}>
            <h1 className={styles.title}>{title}</h1>
            <p className={styles.subtitle}>{description}</p>
            <Link
              to="/aqars"
              className="link primary__ fixed_size__ main_rounded__ center_sm"
            >
              {t('BrowseRealEstate')}
            </Link>
          </Col>
          <Col lg={6}>
            <div className={styles.imageWrapper}>
              <Image src={image} asp={1.00746 * 100} alt="hero" />
            </div>
          </Col>
        </Row>
      </Container>
    </main>
  );
};
