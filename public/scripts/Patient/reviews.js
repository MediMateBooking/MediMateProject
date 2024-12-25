const userID = document.getElementById('userID');
const docID = document.getElementById('docID');

const reviewComment = document.getElementById("reviewComment");

reviewComment.addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const title = formData.get("title");
  const comment = formData.get("comment");

  const commentBody = {
    title : title.trim(),
    comment : comment.trim()
  }

  
  try {
    const response = await fetch(`/patient/review/${userID.textContent}/${docID.textContent}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(commentBody),
    });
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const resonse = await response.json();

    if(resonse.success) {
        e.target.reset();
        createReviewList(resonse.allReviews)
    }

    }catch(e){
        alert('error send comment')
    }
});

function createReviewList(allReviews){
    const reviewList = document.getElementById('reviewList');
    const totalReviews = document.getElementById('totalReviews');
    totalReviews.textContent = allReviews.length

    reviewList.innerHTML =''

    allReviews.forEach(oneReview => {

        const li = document.createElement('li')
        li.innerHTML =  `
        
        <div class="comment">
        <img class="avatar avatar-sm rounded-circle" alt="User Image" src="${oneReview.profilePicture}">
        <div class="comment-body">
            <div class="meta-data">
                <span class="comment-author">${oneReview.authorname}</span>
                <span class="comment-date">Reviewed | ${oneReview.date}</span>
            
            </div>
            
                <p class="comment-content">${oneReview.comment}</p>

        </div>
    </div>
    
        `
    reviewList.append(li)
    
    })
}