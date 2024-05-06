// Function to fetch and display reviews
function displayReviews() {
    $.ajax({
      url: "https://65f17620034bdbecc762b1a9.mockapi.io/reviews/Review",
      method: "GET",
      dataType: "json",
      success: function (data) {
        var reviewList = $("#reviewsList");
        reviewList.empty();
  
        $.each(data, function (index, review) {
          // Check if review has an id property (API reviews)
          if (review.customerName == $("#customerName").val()) {
            // User-added review - allow edit/delete
            reviewList.append(
              `
              <div class="mb-3">
                <h3><span class="math-inline">${review.productName}</h3\>
                </span>${review.customerName}
                <div>${review.reviewContent}</div>
                <button class="btn btn-sm btn-warning btn-edit" data-id="${review.id}">Edit</button>
                <button class="btn btn-sm btn-danger btn-del" data-id="${review.id}">Delete</button>
              </div>
              <hr />
              `
            );
          } else {
            // API review - no edit/delete buttons
            reviewList.append(
              `
              <div class="mb-3">
                <h3>${review.productName}</h3\>
               <div></span>${review.customerName}</div>
                <div>${review.reviewContent}</div>
              </div>
              <hr />
              `
            );
          }
        });
      },
      error: function (error) {
        console.error("Error fetching reviews:", error);
      },
    });
  }

// Function to delete the review
function deleteReview() {
    let reviewId = $(this).attr("data-id");
    $.ajax({
        url: "https://65f17620034bdbecc762b1a9.mockapi.io/reviews/Review/" + reviewId,
        method: "DELETE",
        success: function () {
            displayReviews(); // Refresh the list after deleting a review
        },
        error: function (error) {
            console.error("Error deleting review:", error);
        },
    });
}

// Function to handle form submission
function handleFormSubmission(event) {
    event.preventDefault();
    let reviewID = $("#createBtn").attr("data-id");
    var productName = $("#productName").val();
    var customerName = $("#customerName").val();
    var reviewContent = $("#reviewContent").val();
    if (reviewID) {
        // If reviewID exists, it means it's an update operation
        $.ajax({
            url: "https://65f17620034bdbecc762b1a9.mockapi.io/reviews/Review/" + reviewID,
            method: "PUT",
            data: { productName, customerName, reviewContent },
            success: function () {
                displayReviews(); // Refresh the list after updating the review
            },
            error: function (error) {
                console.error("Error updating review:", error);
            },
        });
    } else {
        // Otherwise, it's a new review to be added
        $.ajax({
            url: "https://65f17620034bdbecc762b1a9.mockapi.io/reviews/Review",
            method: "POST",
            data: { productName, customerName, reviewContent },
            success: function () {
                displayReviews(); // Refresh the list after adding the review
            },
            error: function (error) {
                console.error("Error adding review:", error);
            },
        });
    }
}

// Function to handle edit button click
function editBtnClicked(event) {
    event.preventDefault();
    let reviewID = $(this).attr("data-id");
    $.ajax({
        url: "https://65f17620034bdbecc762b1a9.mockapi.io/reviews/Review/" + reviewID,
        method: "GET",
        success: function (data) {
            $("#createBtn").html("Update");
            $("#createBtn").attr("data-id", data.id);
            $("#productName").val(data.productName);
            $("#customerName").val(data.customerName);
            $("#reviewContent").val(data.reviewContent);
        },
        error: function (error) {
            console.error("Error fetching review for editing:", error);
        },
    });
}

$(document).ready(function () {
    // Initial display of reviews
    displayReviews();

    // Event listeners
    $(document).on("click", ".btn-del", deleteReview); // Delete review
    $(document).on("click", ".btn-edit", editBtnClicked); // Edit review

    // Form submission
    $("#reviewForm").submit(handleFormSubmission);
});
