import Text from "./text";
const AnimesList = (props) => {
    return (
        <div className="d-flex scroll">
            {
                props.animes.map((anime, index) => {
                    return (
                        <div key={index} className="image-container d-inline justify-content-start m-3">
                            <img src={anime.image_url} alt={anime.title} height="300" />
                            <div onClick={()=>props.favorites(anime)} className="overlay d-flex align-items-center justify-content-center">
                                <Text text={props.text} />
                            </div>
                        </div>
                    )
                })
            }
        </div>
    );
}
export default AnimesList;