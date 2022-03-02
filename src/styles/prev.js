import styled from "styled-components";

export const MainLayout = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  position: fixed;
  flex-direction: column;
  background: #fff;
  z-index: 0;
  // border: solid blue 10px;
`;

export const MapLayout = styled.div`
  display: flex;
  position: fixed;
  height: 100vh;
  width: 428px;
  flex-direction: column;
  z-index: -10;
  // margin-bottom: 141px;
  align-items: center;
  justify-content: center;
`;

export const BottomNav = styled.div`
  position: fixed;
  bottom: 0;
  align-items: center;
  justify-content: center;
  width: 428px;
  height: 141px;
  background: #fff;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px 10px 0px 0px;
  z-index: -1;
  display: grid;
  grid-template-columns: 28% 44% 28%;
  grid-template-areas: "account scan help";
`;

export const AccountIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  grid-area: account;
  align-self: center;
  justify-self: center;
`;

export const ScanButtonBottomNav = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  align-self: center;
  justify-self: center;
  grid-area: scan;
`;

export const ScanBottomNavTxt = styled.div`
  font-family: Karla;
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  line-height: 20px;
  text-align: center;
  color: #5c3ef5;
`;

export const HelpIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  grid-area: help;
  align-self: center;
  justify-self: center;
`;

export const PanelStyles = styled.div`
  flex-direction: column;
  position: fixed;
  bottom: 0;
  text-align: left;
  margin-top: 500px;
  background: #fff;
  width: 428px;
  height: 467px;
  background: #fff;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px 10px 0px 0px;
  z-index: 1;
`;

export const AvailabilityTxt = styled.p`
  margin-left: 48px;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 1px;
  // color: #5c3ef5;
  color: #5111A5;
  padding-top: 37px;
  margin-bottom: 5px;
`;

export const LocationName = styled.p`
  margin-left: 48px;
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  color: #1f2326;
  line-height: 1px;
  padding-top: 10px;
  z-index: 1;
`;

export const PriceTxt = styled.p`
  margin-left: 48px;
  padding-top: 5px;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 1px;
  color: #7c7c7c;
`;

export const AmenitiesLayout = styled.div`
  align-items: left;
  justify-content: left;
  margin-left: 48px;
  padding-top: 10px;
`;

export const AmenityName = styled.p`
  font-family: Karla;
  ont-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;
  color: #5111A5;
  z-index: 1;
  margin-left: 10px;
`;

export const ScanButton = styled.div`
  width: 227px;
  height: 60px;
  left: 101px;
  top: 843px;
  background: #3f2a9c;
  border-radius: 50px;
  align-items: center;
  justify-content: center;
`;

export const ScanButtonTxt = styled.p`
  font-family: Karla;
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  line-height: 28px;
  padding-top: 16px;
  text-align: center;
  color: #ffffff;
`;

export const TopBanner = styled.div`
  align-items: center;
  justify-content: center;
  display: flex;
  width: 428px;
  height: 80px;
  background: #ffffff;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
`;
