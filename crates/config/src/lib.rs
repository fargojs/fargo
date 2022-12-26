use std::{fs::File, path::Path, io::{Read, Write}};

use anyhow::Result;
use error::ConfigError;
use serde::{Serialize, Deserialize};
pub mod error;

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Config {
  host: String,
  port: u16
}

impl Default for Config {
  fn default() -> Self {
    Self {
      host: String::from("localhost"),
      port: 4000
    }
  }
}

impl Config {
  pub fn new() -> Self {
    Self::default()
  }

  pub fn from_file<P: AsRef<Path>>(path: P) -> Result<Self, ConfigError> {
    match path.as_ref().extension() {
      Some(ext) => {
        if ext == "toml" {
          let mut file = File::open(path)?;
          let mut contents = String::new();
          file.read_to_string(&mut contents)?;
          Ok(toml::from_str(&contents)?)
        } else {
          Err(ConfigError::InvalidExtension)
        }
      }
      None => Err(ConfigError::MissingExtension),
    }
  }

  pub fn write_file<P: AsRef<Path>>(path: P, config: &Self) -> Result<(), ConfigError> {
    let mut file = File::create(path)?;
    let toml = toml::to_string(&config)?;
    file.write_all(toml.as_bytes())?;
    Ok(())
  }
}
