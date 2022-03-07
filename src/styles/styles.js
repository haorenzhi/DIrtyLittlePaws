import styled from 'styled-components';

export const TopBannerDiv = styled.div`
    display: grid;
    width: 100%;
    height: 10%;
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
    grid-template-columns: 33% 33% 33%;
    grid-template-areas:
        'acc logo ';
`

export const AccountDiv = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    grid-area: acc;
`

export const TopLogoDiv = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    grid-area: logo;
`

export const MapDiv = styled.div`
    width: 100%;
    height: 80%;
    display: flex;
    z-index: -2;
    grid-template-columns: 60% 40%;
    grid-template-rows: 60% 40%;
    grid-template-areas:
    'map map'
    'map mapbuttons';
`


export const MapButtons = styled.div`
    display: flex;
    flex-direction: column;
    padding-left: 10px;
    align-items: center;
    justify-content: center;
    grid-area: mapbuttons;
    z-index: 0;
    bottom: 12%;
    position: fixed;
`

export const BottomNav = styled.div`
    bottom: 0%;
    background: #FFFFFF;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);
    border-radius: 10px 10px 0px 0px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 10;
`