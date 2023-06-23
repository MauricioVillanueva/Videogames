export function validateName(name) {
    if (name.trim() === "") {
      return "Name is required";
    }
    return "";
  }
  
export function validateDescription(description) {
if (description.trim() === "") {
    return "Description is required";
}
return "";
}

export function validatePlatforms(platforms) {
    if (platforms.length === 0) {
      return "Please select at least one platform";
    }
    return "";
}
export function validateGenres(genres) {
    if (genres.length === 0) {
      return "Please select at least one genre";
    }
    return "";
}
export function validateRating(rating) {
    if (rating === 0) {
      return "The rating cannot be zero";
    }
    return "";
}
export function validateImageURL(imageURL) {
    const urlPattern = /^(ftp|http|https):\/\/[^ "]+$/;
  
    if (!urlPattern.test(imageURL)) {
      return "Please enter a valid URL for the image";
    } 
    return "";
}
export function validateDate(date) {
  const datePattern = /^\d{4}-\d{2}-\d{2}$/;
  if (date.trim() === "") {
      return "Description is required";
  }
  if (!datePattern.test(date)) {
      return "Please enter a valid date in the format YYYY-MM-DD";
  }

  return "";
}
