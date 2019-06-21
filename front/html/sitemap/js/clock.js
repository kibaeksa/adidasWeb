
            const clockContainer = document.querySelector('.js-clock'),
            clockTitle = clockContainer.querySelector('h1');
            function getTime(){
                const date = new Date();
                const minutes = date.getMinutes();
                const hours = date.getHours();
                const seconds = date.getSeconds();
                
                // 24시간제
                clockTitle.innerText = 
                `${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}`:minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
                
                // 12시간제
                // clockTitle.innerText = 
                // `${hours > 12 ? `${hours-12}` : hours}:${minutes < 10 ? `0${minutes}`:minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;



            }

            function init(){
                getTime();
                setInterval(getTime,1000);
            };
            init();