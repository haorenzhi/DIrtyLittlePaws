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