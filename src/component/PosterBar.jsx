import styled from "styled-components";
import PropTypes from "prop-types";
const PosterBoxContainer = styled.div`
  border: 2px #d9d9d9 solid;
  display: flex;
  flex-direction: column;
  padding: 10px;
  margin-bottom: 10px;
`;

const Title = styled.h2`
  font-size: 24px;
  margin: 0;
`;

const Content = styled.p`
  font-size: 16px;
  margin: 5px 0;
`;

const Info = styled.small`
  font-size: 14px;
  color: #555;
`;

const Stats = styled.div`
  margin-top: 10px;
  font-size: 14px;
  color: #777;
`;

const PosterBox = ({
  title,
  content,
  author,
  date,
  countLike,
  countComment,
  countScrap,
}) => {
  return (
    <PosterBoxContainer>
      <Title>{title}</Title>
      <Content>{content}</Content>
      <Info>
        {author} | {date}
      </Info>
      <Stats>
        좋아요: {countLike} | 댓글: {countComment} | 스크랩: {countScrap}
      </Stats>
    </PosterBoxContainer>
  );
};

export default PosterBox;

PosterBox.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  countLike: PropTypes.number.isRequired,
  countComment: PropTypes.number.isRequired,
  countScrap: PropTypes.number.isRequired,
};
