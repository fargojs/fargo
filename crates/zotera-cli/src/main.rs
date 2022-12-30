use clap::Parser;
use commands::{CliOptions, Command, CommandRunner};

mod commands;

fn main() -> anyhow::Result<()> {
  let cli = CliOptions::parse();

  env_logger::builder()
    .filter_module("zotera", cli.log)
    .write_style(env_logger::WriteStyle::Always)
    .init();


  match &cli.command {
    Command::Start(options) => options.run(),
  }
}
