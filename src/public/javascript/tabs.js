function openTab(evt, tabName) {
    // Declare all variables
    var i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(tabName).style.display = "flex";
    evt.className += " active";
}

function select(element) {
    const elements = document.getElementsByClassName("case");
    if (!element) {
        element = elements[0];
    }
    for (let i = 0; i < elements.length; i++) {
        elements[i].className = elements[i].className.replace(" active", "");
    }
    element.className += " active";
    this.selected_case = element.textContent;
}