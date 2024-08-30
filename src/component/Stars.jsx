import React from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import styled from "styled-components";

const StarsWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const StarContainer = styled.div`
  position: relative;
  display: inline-block;
  font-size: 24px;
  color: gold;
`;

const StarOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: ${(props) => props.width}%;
  overflow: hidden;
  white-space: nowrap;
`;

const Stars = ({ rating = 0 }) => {
  // rating이 숫자인지 확인하고, 아니라면 0으로 설정
  const safeRating = typeof rating === "number" ? rating : 0;

  const fullStars = Math.floor(safeRating);
  const remainder = safeRating - fullStars;
  const overlayWidth = remainder * 100;

  return (
    <StarsWrapper>
      {[...Array(5)].map((_, i) => (
        <StarContainer key={i}>
          <AiOutlineStar />
          {i < fullStars && (
            <StarOverlay width={100}>
              <AiFillStar />
            </StarOverlay>
          )}
          {i === fullStars && remainder > 0 && (
            <StarOverlay width={overlayWidth}>
              <AiFillStar />
            </StarOverlay>
          )}
        </StarContainer>
      ))}
      <span style={{ marginLeft: "8px", fontSize: "16px", color: "#555" }}>
        {safeRating.toFixed(1)}
      </span>
    </StarsWrapper>
  );
};

export default Stars;
