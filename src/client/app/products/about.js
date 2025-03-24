/**
 * about.js
 * 
 * Name: Amanjot Singh
 * Date: March, 2025
 * Course: Web Development
 * 
 * Handles interactions on the about page.
 */


// DOM elements will be set when the DOM is loaded
let developerInfo;

/**
 * Initialize the about page
 */
function initAboutPage() {
  // Get DOM elements
  developerInfo = document.getElementById('developer-info');
  
  // Populate developer info if it exists
  if (developerInfo) {
    populateDeveloperInfo();
  }
}


/**
 * Populate developer information
 */
function populateDeveloperInfo() {
  const developerData = {
    name: 'Amanjot Singh',
    picSrc: './assets/img/dev.png',
    role: 'Web Developer',
    email: 'amanjot.singh3@dcmail.ca',
    skills: ['HTML', 'CSS', 'JavaScript', 'Bootstrap', 'Node.js'],
    description: 'I am passionate about web development and creating intuitive, user-friendly interfaces. This project was created as part of my web development coursework.'
  };
  
  // Create HTML for developer info
  const skillsHTML = developerData.skills.map(skill => `<span class="badge bg-primary me-1">${skill}</span>`).join('');
  
  developerInfo.innerHTML = `
    <div class="card"> 
      <div class="row align-items-center card-body mb-4">
      <h2 class="card-title">About the Developer</h2>
        <div class="col-md-4 text-center mb-3 mb-md-0">
          <img src="${developerData.picSrc}" class="rounded-circle img-fluid" alt="Developer photo">
        </div>
        <div class="col-md-8">
          <h3>${developerData.name}</h3>
          <h5 class="text-muted">${developerData.role}</h5>
          <p>${developerData.description}</p>
          <p><strong>Email:</strong>${developerData.email}</p>
          <div class="mt-3">
            <p><strong>Skills:</strong> ${skillsHTML}</p>
          </div>
        </div>
      </div>
    </div>
  `;
}

// Initialize about page when DOM is loaded
document.addEventListener('DOMContentLoaded', initAboutPage);

// Export functions for use in other modules
export { initAboutPage };