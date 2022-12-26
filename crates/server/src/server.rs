use anyhow::Result;
#[cfg(feature = "actix")]
use zotera_actix::call;
#[cfg(feature = "axum")]
use zotera_axum::call;

use zotera_config::Config;

#[derive(Debug)]
pub struct ZoteraServer {
  config: Config
}

pub fn create_zotera(config: Config) -> ZoteraServer {
  call();
  ZoteraServer::new(config)
}


impl ZoteraServer {
  pub fn new(config: Config) -> Self {
    ZoteraServer { config }
  }



  pub fn start(&self) -> Result<()> {
    Ok(())
  }

  pub fn stop(&self) -> Result<()> {
    Ok(())
  }


}
