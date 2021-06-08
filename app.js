'use strict';

let container=document.getElementById('images-div');
let leftImageElement=document.getElementById('left-image');

let midImageElement=document.getElementById('mid-image');
let rightImageElement=document.getElementById('right-image');

let maxAttempts=10;
let userAttemptsCounter=0;

// the random number index for the left image
let leftImageIndex; 


// the random number index for the left image
let midImageIndex; 

// the random number index for the right image
let rightImageIndex;

let productNames=[];
let votes=[];
let times=[];
let images=[];


function Product(name,source) {
  this.name=name;
  this.source=source;
  this.votes=0;
 this.time=0;

 productNames.push(this.name);
  Product.allProducts.push(this);
}

Product.allProducts=[];


new Product('bag','images/bag.jpg');//0
new Product('banana', 'images/banana.jpg');//1
new Product('bathroom', 'images/bathroom.jpg');//2
new Product('boots', 'images/boots.jpg');//3
new Product('breakfast', 'images/breakfast.jpg');//4
new Product('bubblegum', 'images/bubblegum.jpg');//5
new Product('chair', 'images/chair.jpg');//6
new Product('cthulhu', 'images/cthulhu.jpg');//7
new Product('dog-duck', 'images/dog-duck.jpg');//8
new Product('dragon', 'images/dragon.jpg');//9
new Product('pen', 'images/pen.jpg');//10
new Product('pet-sweep', 'images/pet-sweep.jpg');//11
new Product('scissors', 'images/scissors.jpg');//12
new Product('shark', 'images/shark.jpg');//13
new Product('sweep', 'images/sweep.png');//14
new Product('tauntaun', 'images/tauntaun.jpg');//15
new Product('unicorn', 'images/unicorn.jpg');//16
new Product('usb', 'images/usb.jpg');//17
new Product('water-can', 'images/water-can.jpg');//18
new Product('wine-glass', 'images/wine-glass.jpg');//19



function generateRandomIndex() {
  
  return Math.floor(Math.random() * Product.allProducts.length); 
}

// console.log(generateRandomIndex());


function renderImages() {
  
  leftImageIndex=generateRandomIndex();
 
  
  midImageIndex=generateRandomIndex();
  
  
  rightImageIndex=generateRandomIndex();
 


  while (leftImageIndex===rightImageIndex||leftImageIndex===midImageIndex||midImageIndex===rightImageIndex||images.includes(leftImageIndex)||images.includes(midImageIndex)||images.includes(rightImageIndex)) {
  
    leftImageIndex=generateRandomIndex();
    midImageIndex=generateRandomIndex(); 
    rightImageIndex=generateRandomIndex();
  }
    images=[];
    images.push(leftImageIndex,midImageIndex,rightImageIndex);
    // images[0]= leftImageIndex;
    // images[1]= midImageIndex;
    // images[2]= rightImageIndex;
    

  

  // console.log(images[0]);
  // make the source for the left and right image equal to the random goat source
  leftImageElement.src=Product.allProducts[leftImageIndex].source;
  Product.allProducts[leftImageIndex].time++;
  midImageElement.src=Product.allProducts[midImageIndex].source;
  Product.allProducts[midImageIndex].time++;
  rightImageElement.src=Product.allProducts[rightImageIndex].source;
  Product.allProducts[rightImageIndex].time++;

}
renderImages();

// add event listner

// container

container.addEventListener('click',handleUserClick);

 


    
let button=document.getElementById('btn');

button.hidden=true;
function handleUserClick(event) {
  
  console.log(event.target.id);
  userAttemptsCounter++;
  // console.log(userAttemptsCounter);


  if (userAttemptsCounter<=maxAttempts) {


    if (event.target.id==='left-image') {
      // the random number
      // Product.allProducts[5].votes++
      Product.allProducts[leftImageIndex].votes++}
      else if (event.target.id==='mid-image'){
        Product.allProducts[midImageIndex].votes++
    } else if (event.target.id==='right-image'){
      Product.allProducts[rightImageIndex].votes++
  }else{
      alert('please click on the images');
      userAttemptsCounter--;
    
    }

    // console.log(Product.allProducts);
    renderImages();


  } else{ 
   
button.hidden=false;
    // alert("click the button")
    button.addEventListener('click',showResult); 
    // showResult();
    container.removeEventListener('click',handleUserClick);
     
    for (let i = 0; i < Product.allProducts.length; i++) {

      votes.push(Product.allProducts[i].votes);
      times.push(Product.allProducts[i].time);
    }
    chart();
    

}
}

function showResult() {
 
    // show results
    let list=document.getElementById('results-list');
    for (let i = 0; i < Product.allProducts.length; i++) {
      let productResult=document.createElement('li');

      list.append(productResult);

      productResult.textContent=`${Product.allProducts[i].name} had ${Product.allProducts[i].votes} votes, and was seen ${Product.allProducts[i].time} times`;
      
    }

    button.removeEventListener('click',showResult);  
   
  }
  


  function chart() {
    let ctx = document.getElementById('myChart');
    let myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels:productNames,
            datasets: [{
                label: '# of Votes',
                data:votes,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            },
            {
              label: '# of Shown',
              data:times,
              backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)'
              ],
              borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)'
              ],
              borderWidth: 1
          }
          ]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
      
  }
   