use clap::{Parser, Subcommand};

mod start;


pub use start::*;

#[derive(Subcommand)]
pub enum Command {
    Start(StartOptions),
}

#[derive(Parser)]
#[clap(name = "zotera", version, propagate_version = true)]
pub struct CliOptions {
    #[clap(subcommand)]
    pub command: Command,

    #[arg(
      long,
      required = false,
      global = true,
      value_enum,
      default_value = "info"
  )]
  pub log: log::LevelFilter,
}

pub trait CommandRunner {
    fn run(&self) -> anyhow::Result<()>;
}
