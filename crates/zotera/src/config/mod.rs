use std::{str::FromStr, net::IpAddr};

use serde::{Deserialize, Deserializer};

mod load;


const DEFAULT_CONFIG: &str = include_str!("../../configs/config.toml");


#[derive(Debug, Deserialize)]
pub struct Config {
  pub network: Network,
  pub logging: Logging,
  pub plugins: Plugins,
  pub web: Web
}

#[derive(Debug, Deserialize)]
pub struct Network {
    pub address: IpAddr,
    pub port: u16,
}

#[derive(Debug, Deserialize)]
pub struct Logging {
    #[serde(deserialize_with = "deserialize_log_level")]
    pub level: log::LevelFilter,
}

#[derive(Debug, Deserialize)]
pub struct Plugins {}

#[derive(Debug, Deserialize)]
pub struct Web {
  pub title: Option<String>,
  pub favicon: Option<String>,
  pub logo: Option<String>
}

fn deserialize_log_level<'de, D: Deserializer<'de>>(
  deserializer: D,
) -> Result<log::LevelFilter, D::Error> {
  let string: String = String::deserialize(deserializer)?;
  let level = log::LevelFilter::from_str(&string).map_err(|_| {
      serde::de::Error::custom(
          "invalid log level: valid options are trace, debug, info, warn, error",
      )
  })?;
  Ok(level)
}
