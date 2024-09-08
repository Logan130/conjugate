import Paris1 from '../../static/paris-games-artistic-gymnastics-6753651837110525-2xa.gif'
import Paris2 from '../../static/paris-games-football-6753651837110524-2xa.gif'
import Paris3 from '../../static/paris-games-opening-ceremony-6753651837110444-2xa.gif'
import Paris4 from '../../static/paris-games-skateboarding-6753651837110523-2xa.gif'
import Paris5 from '../../static/paris-games-july-most-searched-playground-6753651837110527-2xa.gif'
import Paris6 from '../../static/paris-games-surfing-6753651837110528-2xa.gif'
import Paris7 from '../../static/paris-games-rings-6753651837110531-2xa.gif'
import Paris8 from '../../static/paris-games-artistic-swimming-6753651837110445-2xa.gif'
import Paris9 from '../../static/paris-games-breaking-6753651837110566-2xa.gif'
import Paris10 from '../../static/paris-games-conclude-6753651837110568-2xa.gif'
import Paris11 from '../../static/paralympic/p1.gif'
import Paris12 from '../../static/paralympic/p2.gif'
import Paris13 from '../../static/paralympic/p3.gif'
import Paris14 from '../../static/paralympic/p4.gif'
import Paris15 from '../../static/paralympic/p5.gif'
import Paris16 from '../../static/paralympic/p6.gif'
import Paris17 from '../../static/paralympic/p7.gif'
import Paris18 from '../../static/paralympic/p8.gif'
import Paris19 from '../../static/paralympic/p9.gif'

import { useState, useContext } from 'react';
import { ThemeContext } from '../../context/context';



function PCImages ({ images }) {
    const { eng } = useContext(ThemeContext);
    // const [currentImageIndex, setCurrentImageIndex] = useState(eng ? 1 : 0);
    const [fade, setFade] = useState(true);
    // const titleArr = ["Mulan", "Orlando", "Twelfth Night"];
    const titleOlymArr = [
        "Ceremony", "Skateboarding", "Football", "Artistic Gymnastics", "Track and Field", "Surfing", "Rings", "Artistic Swimming", "Breaking", "Conclude!", 
        "Paralympic Games Begin!", "Playground", "Basketball", "Athletics", "Archery", "Powerlifting", "Tennis", "Equestrian", "Conclude!"
        ];

    let imagesOlym = [Paris3, Paris4, Paris2, Paris1, Paris5, Paris6, Paris7, Paris8, Paris9, Paris10, Paris11, Paris12, Paris13, Paris14, Paris15, Paris16, Paris17, Paris18, Paris19];
    images = imagesOlym
    const [currentImageIndex, setCurrentImageIndex] = useState(new Date().getTime() % imagesOlym.length);

    // useEffect(() => {
    //     if (eng) {
    //         setCurrentImageIndex(1);
    //     }
    //     else {
    //         setCurrentImageIndex(0);
    //     }
    // }, [eng])

    // const captionArr = [
    //     <div className='flex items-center justify-center text-neutral-content'>
    //         <p className='text-neutral-content italic'>双兔傍地走，安能辨我是雄雌</p>🐰 (点击下方单元练习阴阳性)
    //     </div>,

    //     <div className='flex items-center justify-center text-neutral-content'>
    //         <p className='text-neutral-content italic'>The change of sex, though it altered their future, did nothing whatever to alter their identity. ({eng ? "Click the button Gender to practice" : "点击下方单元练习阴阳性"})</p>
    //     </div>,

    //     <div className='flex items-center justify-center text-neutral-content'>
    //         <p className='text-neutral-content italic'>Conceal me what I am, and be my aid. For such disguise as haply shall become the form of my intent. ({eng ? "Click the button Gender to practice" : "点击下方单元练习阴阳性"})</p>
    //     </div>
    // ]

    const nextImage = () => {
        setFade(false);
        setTimeout(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
            setFade(true);
        }, 300); // The duration should match the CSS transition duration
    };

    const prevImage = () => {
        setFade(false);
        setTimeout(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
            setFade(true);
        }, 300); // The duration should match the CSS transition duration
    };

    return (
        <div className="relative">
            <div className="overflow-hidden rounded-lg">
                <img
                    src={imagesOlym[currentImageIndex]}
                    alt={`sliding ${currentImageIndex + 1}`}
                    className={`w-full transition-opacity duration-300 ${fade ? 'opacity-100' : 'opacity-0'}`}
                />
            </div>

            {/* <div className="absolute left-0 top-60 flex items-center">
                <button
                    onClick={prevImage}
                    className="text-white text-3xl bg-gray-800 bg-opacity-50 hover:bg-opacity-75 px-3 py-1 rounded-l focus:outline-none"
                >
                    &larr;
                </button>
            </div>

            <div className="absolute top-0 inset-x-0 flex items-center justify-center">
                <button
                    className="text-white text-sm font-bold bg-gray-800 bg-opacity-50 hover:bg-opacity-30 px-3 py-1 rounded-b-lg focus:outline-none"
                >
                    {titleArr[currentImageIndex]}
                </button>
            </div>

            <div className="absolute right-0 top-60 flex items-center">
                <button
                    onClick={nextImage}
                    className="text-white text-3xl bg-gray-800 bg-opacity-50 hover:bg-opacity-75 px-3 py-1 rounded-r focus:outline-none"
                >
                    &rarr;
                </button>
            </div> */}

            <div className="absolute left-0 top-32 flex items-center">
                <button
                    onClick={prevImage}
                    className="text-white text-3xl bg-gray-800 bg-opacity-50 hover:bg-opacity-75 px-3 py-1 rounded-l focus:outline-none"
                >
                    &larr;
                </button>
            </div>

            <div className="absolute top-0 inset-x-0 flex items-center justify-center">
                <button
                    className="text-white text-sm font-bold bg-gray-800 bg-opacity-50 hover:bg-opacity-30 px-3 py-1 rounded-b-lg focus:outline-none"
                >
                    {titleOlymArr[currentImageIndex]}
                </button>
            </div>

            <div className="absolute right-0 top-32 flex items-center">
                <button
                    onClick={nextImage}
                    className="text-white text-3xl bg-gray-800 bg-opacity-50 hover:bg-opacity-75 px-3 py-1 rounded-r focus:outline-none"
                >
                    &rarr;
                </button>
            </div>


            {/* <div className='flex items-center justify-center text-neutral-content'>
                <p className='text-neutral-content italic'>安能辨我是雄雌</p>🐰 (点击下方单元练习阴阳性)
            </div> */}
            <div className='flex flex-col items-center justify-center '>
                <p className=' italic'>{eng ? 'Faster, Higher, Stronger 🇫🇷' : '更高，更快，更强 🇫🇷'}</p>
                <p className=' italic'>{eng ? ' ' : '更多，更牢，更快 📖'}</p>
            </div>
        </div>
    );
}

export function ImagesAll ({ isIpadUser }) {
    const { eng } = useContext(ThemeContext);
    let isMobile = window.innerWidth < 850;
    let images = [Paris1, Paris2, Paris3, Paris4, Paris5, Paris6, Paris7, Paris8, Paris9, Paris10, Paris11, Paris12, Paris13, Paris14, Paris15, Paris16, Paris17, Paris18, Paris19];

    return (
        <>
            {isMobile ?
                <>
                    {eng ?
                        // <>
                        //     <img alt="Twelfe Night" src={TwelfthNight} className='rounded-lg' />
                        //     <div className='flex items-center justify-center text-neutral-content'>
                        //         <p className='text-neutral-content italic'>Conceal me what I am, and be my aid. For such disguise as haply shall become the form of my intent. (Click the button Gender to practice)</p>
                        //     </div>
                        //     <br />
                        // </> 
                        // : 
                        // <>
                        //     <img alt="Mulan" src={Mulan} className='rounded-lg' />
                        //     <div className='flex items-center justify-center text-neutral-content'>
                        //         <p className='text-neutral-content text-sm'>双兔傍地走，安能辨我是雄雌🐰 (点击下方按钮练习阴阳性)</p>
                        //     </div>
                        //     <br />
                        // </>
                        <>
                            <img alt="Twelfe Night" src={images[Math.floor(Math.random() * 10000) % images.length]} className='rounded-lg' />
                            <div className='flex items-center justify-center text-neutral-content'>
                                <p className='text-neutral-content italic'>Faster, Higher, Stronger 🇫🇷</p>
                            </div>
                            <br />
                        </>
                        :
                        <>
                            <img alt="Mulan" src={images[(Math.floor(Math.random() * 10000) + new Date().getTime()) % images.length]} className='rounded-lg' />
                            <div className='flex items-center justify-center text-neutral-content'>
                                <p className='text-neutral-content text-sm'>更高，更快，更强 🇫🇷</p>
                            </div>
                            <br />
                        </>
                    }
                </>
                :
                <>
                    <div className={isIpadUser ? 'flex justify-center items-start' : 'flex justify-center items-start'}>
                        <div className='w-1/2'>
                            <PCImages images={[]} className='rounded-lg w-1/2' />
                        </div>
                    </div>
                </>}
        </>
    )
}

