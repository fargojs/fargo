use std::io;

use thiserror::Error;

#[derive(Error, Debug)]
pub enum ConfigError {
  #[error("Missing extension")]
  MissingExtension,
  #[error("Invalid extension")]
  InvalidExtension,
  #[error("Invalid config")]
  InvalidConfig,
  #[error("IO error: {0}")]
  Io(#[from] io::Error),
  #[error("error deserializing TOML {0}")]
  TOMLD(#[from] toml::de::Error),
  #[error("error serializing TOML {0}")]
  TOMLS(#[from] toml::ser::Error),
  #[error("unknown error")]
  Unknown,
}
