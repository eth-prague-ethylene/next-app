export const NearProfile = ({ handle, address, requireLogin, testnet }: {
    handle: string, address?: string, requireLogin?: boolean, testnet?: boolean
}) => {

    const getUrl = () => {
        return `https://test.near.social/#/embed/matiasberaldo.testnet/widget/EthelyneLensProfile?handle=${handle}&testnet=${testnet}&ethereumAddress=${address}&requireLogin=${requireLogin}`;
    };

    return (
        <div style={{overflow: 'hidden'}}>
            <iframe
                width="90%"
                height="600px"
                id="iframe-near"
                style={{
                    border: "none",
                    "borderRadius": "10px",
                    overflow: 'hidden',
                    borderColor: 'white 10px',
                }}
                scrolling="no"
                src={getUrl()}
            ></iframe>
        </div>

    )
}
