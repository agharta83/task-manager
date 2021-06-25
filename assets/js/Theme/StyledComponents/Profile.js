import styled from "styled-components";
import {Link, NavLink} from "react-router-dom";

export const Container = styled.div`
  background: #ffffff;
  width: 800px;
  height: 500px;
  margin: 0 auto;
  position: relative;
  //margin-top: 10%;
  box-shadow: 2px 5px 20px rgba(119, 119, 119, .5);
  border-radius: 10px;
`;

export const TitleContainer = styled.div`
  float: right;
  margin-right: 12px;
  margin-top: 12px;
  color: #C05749;
  font-weight: 900;
  font-size: 1.5em;
  letter-spacing: 1px;
`;

export const TabContainer = styled.div`
  float: left;
  top: -5%;
  left: 5%;
  position: absolute;
  width: 15%;
  height: 110%;
  background: #C05749;
  box-shadow: 3px 3px 10px rgba(119, 119, 119 , .5);
`;

export const Item = styled(Link)`
  list-style: none;
  padding: 35px;
  color: #FFFFFF;
  font-size: 1.1em;
  display: block;
  transition: all .3s ease-in-out;
  text-align: center;
  
  &:hover {
  color: #FFC3AE;
  transform: scale(1.2);
  cursor: pointer;
  }
  
  &:first-child {
  margin-top: 7px;
  }
`;

export const TabContent = styled.div`
  float: right;
  width: 60%;
  height: 100%;
`;

export const Content = styled.div`
  transition: opacity .5s ease-in;
  position: absolute;
  width: 70%;
  margin-left: 25px;
`;

export const TitleContent = styled.p`
  color: #c05749;
  font-size: 1em;
  margin-top: 40px;
  margin-bottom: 35px;
  margin-left: 15px;
`;
