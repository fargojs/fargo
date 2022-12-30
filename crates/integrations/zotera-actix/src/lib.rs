use actix_web::{Route, web, HttpRequest};


pub fn configure() -> Route {
  web::get().to(move |req: HttpRequest| {
    async move {
      let path = req.path();
      let query = req.query_string();

      format!("{}?{}", path, query)
    }
  })
}
