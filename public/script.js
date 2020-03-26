const getAllGraduates = () => {
    const url = '/graduateRoutes';
    const parent = document.getElementById("results");
    fetch(url)
        .then(response => {
            return response.json();
        }).then(data => {
           // DR: Selecting the div element that will show the results 'parent'.
           if(!parent.children.length > 0){
            const displayGraduates = data.reverse().map(object => {
            console.log(1, object)
             // This will append a new element to the parent parent which gets the element (index.html: <div id="results"></div>)
             // See the 'GraduateElement' class below if confused on how this work.
             parent.appendChild(new GraduateElement(object.graduateName, object.profession, object.company, object.graduationDate))
        })
    } else {
        // This prevents the parent from appending the same informantion all over again. But rather hide it then show it.
        if (parent.style.display === 'none')  parent.style.display = 'inline' 
        else parent.style.display = 'none'
    }
        }).catch(err => console.log(err));
}


//  CREATE NEW GRADUATE : POST
async function createNewGraduate () {
    event.preventDefault()
    const graduateName = document.getElementById("graduateName").value;
    const email = document.getElementById("email").value;
    const profession = document.getElementById("profession").value;
    const company = document.getElementById("company").value;
    const graduationDate = document.getElementById("graduationDate").value;
    const skills = document.getElementById("skills").value;
    const linkedIn = document.getElementById("linkedIn").value;
    const twitter = document.getElementById("twitter").value;
    const postUrl = `/graduateRoutes`;

    fetch(postUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },

        body: makeJSON({ graduateName, email, profession, company, graduationDate, skills, linkedIn, twitter })
    }).then(response => {
        console.log(response)
        return response.json();
    }).then(newGraduate => {
        console.log(newGraduate);
        return newGraduate
    }).catch(err => console.log(err));
}


// CX: GET SPECIFIC GRADUATE
async function getSpecificGraduate() {

    event.preventDefault();

    const searchName = document.getElementById("searchName").value;

    const url2 = `/graduateRoutes/${ searchName }`;

    fetch(url2)

    .then(response => {

        return response.json()

    })

    .then(data => {
     const display = data.map( object => { 
        document.getElementById("displayGraduate").innerHTML += 

        `<p> 

            <div>${object.graduateName}</div> 

            <div>${object.email}</div>

            <div>${object.profession}</div>  

            <div>${object.company}</div> 

            <div>${object.graduationDate}</div>  

            <div>${object.skills}</div>  

            <div>${object.linkedIn}</div>  

            <div>${object.twitter}</div>  

            

        </p> `

    })

    // .catch(err => console.log(err));

})

}
// delete a graduate
async function deleteGraduate() {
    event.preventDefault();
    const graduateID = document.getElementById("graduateId").value;
    const deleteUrl = `/graduateRoutes/${graduateID}`;

    fetch(deleteUrl, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => {
        return response.json();
    }).then(deletedGraduate => {
        console.log(deletedGraduate);
        return deletedGraduate;
    }).catch(err => console.log(err));
}


const getAllArticles = () => {
    const url = '/articleRoutes';
    fetch(url)
        .then(response => {
            return response.json();
        }).then(data => {
            console.log(data)
        }).catch(err => console.log(err));
}




const makeJSON = (newGraduate) => {
    return JSON.stringify(newGraduate);
}


// CX API NEWS

// const api = 'http://newsapi.org/v2/everything?q=';
// const apiKey = "6e400e8253b34851bd569d65c5d2ea91"; 
// const url = api + searchArticle + 'sortBy=popularity&' + apiKey;
// const url = api + 'sortBy=popularity&apiKey=' + apiKey;

const url2 = "https://newsapi.org/v2/sources?language=en&country=us&apiKey=6e400e8253b34851bd569d65c5d2ea91";
const req = url2;

fetch(req)
    .then((response) => {
        return (response.json())
    })
    .then(data => {
            console.log(JSON.stringify(data))

    }).catch (error => console.log(error));


//GS: Here is where I added the news API
// Not done correctly @Georgina
// const getApiArticles = async () => {
// try {
//     const getTrendingNews = await fetch("http://newsapi.org/v2/top-headlines?country=us&apiKey=dd80dd8bf5ce4c67938429270d5b02bff")
//     const parsedJson = await getTrendingNews.json()
//     // let amountText = document.getElementById("number-of-trending-articles") 
//     let count = 0;
//     // let parent = document.getElementById("trending-articles-results")
//     const displayData = parsedJson.articles.map(object => {
//         console.log(object)
//         // if (appended) {
//         //     ++count
//         // }
//     })
//     // amountText.innerText = count + ''
// } catch {
//     console.log(" Error in 'showTrendingArticle()' ")
// }
// }


// getApiArticles()
// DR: Adding a class which will be used to construct a HTML element based on each object the 'getAllArticles'
// Notice I am only including wsome feilds to keep it breif and if a user wants more information on a graduate then i can link them
// to their page which will have the rest of the information.
class GraduateElement {
    constructor(graduateName, profession, company, graduationDate) {
        // Will use a 'div' ELement to contain all this information and 'div' is used very often becuase it can contain things in a box like structure. 
        // 'document.createElement' creates any html element by only its tag name not the '<' or '/>' added to it. Good for creating elements on the fly.
        let main = document.createElement('div');
        let nameElement = document.createElement("a");
        let professionElement = document.createElement("span");
        let companyElement = document.createElement("span");
        let graduationDateElement = document.createElement("span");

        nameElement.innerText = ` ${graduateName} \n`
        professionElement.innerText = `Profession: ${profession} \n`
        companyElement.innerText = `Employer: ${company} \n`;
        graduationDateElement.innerText = `Date of graduation${graduationDate} \n`;

        main.style = 'padding: 20px'
        nameElement.style = 'font-weight: bold; text-decoration: none;'
        nameElement.setAttribute("href", "#") // The '#' will be changed to a link to another page that displays a graduate. For now it is a link that navigates no where.

        main.appendChild(nameElement);
        main.appendChild(professionElement);
        main.appendChild(companyElement);
        main.appendChild(graduationDateElement);

        return main;
    }
}

// console.log(1, location.href)