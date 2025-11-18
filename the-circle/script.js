var greencircle = document.querySelector('.green-circle');

greencircle.addEventListener('click',function(){
    this.greencircle = 'Clicked!';
    this.style.backgroundColor = 'green'

    console.log(this);
});





  