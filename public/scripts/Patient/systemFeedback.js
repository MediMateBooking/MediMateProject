const userID = document.getElementById('userID');
const feedback = document.getElementById('feedback');

feedback.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const title = formData.get("title");
    const comment = formData.get("comment");
  
    if(title.trim().length === 0 && comment.trim().length === 0){
      alert('Please fill out all fields')
      return
    }
  
    if(title.trim().length === 0){
      alert('Title cannot be empty')
      return
    }
  
    if(comment.trim().length === 0){
      alert('Comment cannot be empty')
      return
    }
  
    const commentBody = {
      title : title.trim(),
      comment : comment.trim()
    }

    try {
      const response = await fetch(`/add/feedback/${userID.textContent}`, {
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
          createReviewList(resonse.allFeedback)
      }
  
      }catch(e){
          alert('error send comment')
      }
  });
  
  function createReviewList(allFeedback){
      const reviewList = document.getElementById('reviewList');
    //   const totalReviews = document.getElementById('totalReviews');
    //   totalReviews.textContent = allReviews.length
  
      reviewList.innerHTML =''
  
      allFeedback.forEach(oneReview => {
  
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
