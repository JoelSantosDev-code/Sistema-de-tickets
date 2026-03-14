fetch("/api/tickets")
    .then(res => res.json())
    .then(data => {
        console.log(data)
    });