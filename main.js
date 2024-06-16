const btn = document.querySelectorAll(".time-tags");
const container = document.querySelector('.card-container'); 

let fetchedData = null;

const fetchReport = fetch('./data.json');

fetchReport
  .then((response) => {
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    } else {
      console.log("ok");
    }

    return response.json();
  })
  .then((data) => {
    console.log(data);
    // Store the fetched data
    fetchedData = data; 
    // Initialize with 'weekly' data
    dashboard(data, 'weekly'); 
  })
  .catch((error) => {
    console.error(`data not found ${error}`);
  });

btn.forEach((btns) => {
  btns.addEventListener("click", (e) => {
    const timeframe = e.currentTarget.innerHTML.toLowerCase();
    console.log(timeframe);

    if (fetchedData) {
      container.innerHTML = '';
      // Update with selected timeframe
      dashboard(fetchedData, timeframe); 
    }

    

    // Reset all buttons to default color
    btn.forEach((btn) => btn.style.color = 'var(--Desaturated-blue)');
    e.currentTarget.style.color = 'var(--Pale-Blue)'; 
  });
});

function dashboard(data, timeframe) {
  data.forEach((item) => {
    const card = document.createElement('section');
    card.classList.add('card');
    card.setAttribute('style', `background-color: ${item.color}`);
    card.innerHTML = `
      
      <section class="hero-img" style = "background-color: ${item.color}";>
        <img src="${item.image}" alt="">
      </section>
      <section class="card-info">
        <header>
          <p>${item.title}</p>
          <img src="./images/icon-ellipsis.svg" alt="">
        </header>
        <section class="card-desc">
          <figure class="hours"><p>${item.timeframes[timeframe].current}hrs</p></figure>
          <figure class="time-period">
            <p>Last Week -</p>
            <p>${item.timeframes[timeframe].previous}hrs</p>
          </figure>
        </section>
      </section>
    `;
    container.appendChild(card);
  });
}
