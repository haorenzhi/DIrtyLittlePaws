import styled from 'styled-components';

export const MainLayout = styled.div`
        width: 100vw;
        height: 100vh;
        display: flex;
        align-items: center;
        position: fixed;
        flex-direction: column;
        background: #fff;
        z-index: 0;
    `

export const MapLayout = styled.div`
        display: flex;
        position: fixed;
        flex-direction: column;
        z-index: -1;
        margin-left: -428px;
        align-items: center;
        justify-content: center;
    `

export const BottomNav = styled.div`
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin-top: 785px;
        background: #fff;
        width: 428px;
        height: 141px;
        background: #fff;
        box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
        border-radius: 10px 10px 0px 0px;
        z-index: -1;
        `


export const PanelStyles = styled.div`
        flex-direction: column;
        text-align: left;
        margin-top: 500px;
        background: #fff;
        width: 428px;
        height: 467px;
        background: #fff;
        box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
        border-radius: 10px 10px 0px 0px;
        z-index: -1;
        `

export const AvailabilityTxt = styled.p`
        margin-left: 48px;
        font-family: Karla;
        font-style: normal;
        font-weight: bold;
        font-size: 16px;
        line-height: 1px;
        color: #5C3EF5;
        padding-top: 37px;
`

export const LocationName = styled.p`
        margin-left: 48px;
        font-family: Karla;
        font-style: normal;
        font-weight: bold;
        font-size: 20px;
        color: #1F2326;
        line-height: 1px;
        z-index: 1;
    `

export const PriceTxt = styled.p`
        margin-left: 48px;
        font-family: Karla;
        font-style: normal;
        font-weight: bold;
        font-size: 16px;
        line-height: 1px;
        color: #7C7C7C;
`

export const AmenitiesLayout = styled.div`
        display: flex;
        flex-direction: column;
        align-items: left;
        justify-content: left;
        margin-left: 48px;
`


export const AmenityName = styled.p`
        font-family: Karla;
        font-style: normal;
        font-weight: 500;
        font-size: 16px;
        line-height: 19px;
        color: #1F2326;
        z-index: 1;
`

export const ScanButton = styled.div`
        width: 227px;
        height: 60px;
        left: 101px;
        top: 843px;
        background: #3F2A9C;
        border-radius: 50px;
        align-items: center;
        justify-content: center;
`

export const ScanButtonTxt = styled.p`
        font-family: Karla;
        font-style: normal;
        font-weight: bold;
        font-size: 24px;
        line-height: 28px;
        padding-top: 16px;
        text-align: center;
        color: #FFFFFF;
`

    
