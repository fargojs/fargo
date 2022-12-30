use clap::Parser;
// use zotera_server::ZoteraServer;

#[derive(Parser)]
pub struct StartOptions {
  #[arg(short, long, default_value_t = 4000, value_parser = clap::value_parser!(u16).range(1..))]
  pub port: u16,

  #[arg(long, default_value = "localhost")]
  pub host: String,

  #[arg(short, long)]
  pub config: Option<String>,
}

impl super::CommandRunner for StartOptions {
  fn run(&self) -> anyhow::Result<()> {
    log::info!("Starting server on {}:{}", self.host, self.port);
    // let config = if let Some(config_path) = &self.config {
    //   zotera_config::Config::from_file(config_path)?
    // } else {
    //   zotera_config::Config::new()
    // };
    // log::info!("Config: {:?}", config);

    Ok(())
  }
}
