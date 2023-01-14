use actix_web::{web, HttpRequest, Route};

pub use zotera::config::Config;

pub fn configure(opts: Option<zotera::config::Config>) -> impl FnOnce(&mut web::ServiceConfig) {
  move |cfg: &mut web::ServiceConfig| {
    let config = if (opts.is_none()) {
      println!("No config provided");
      Config {
        network: todo!(),
        logging: todo!(),
        plugins: todo!(),
        web: todo!(),
      }
    } else {
      println!("Config provided");
      opts.unwrap()
    };

    println!("Config {:?}", config);
    cfg.route(
      "{route:.*}",
      web::get().to(move |req: HttpRequest| async move {
        let path = req.path();
        let query = req.query_string();

        format!("{}?{}", path, query)
      }),
    );
  }
  // web::get().to(move |req: HttpRequest| {
  //   async move {
  //     let path = req.path();
  //     let query = req.query_string();

  //     format!("{}?{}", path, query)
  //   }
  // })
}
