import re
import math
import argparse
import logging
import pandas
from twilio.rest import Client
from twilio.base.exceptions import TwilioRestException
import sensitive_settings


def main():
    # Set up logging.
    logging.basicConfig(filename="bulk_texting_log.txt", level=logging.DEBUG)
    logger = logging.getLogger()
    logger.handlers = list()
    # Clear handlers to avoid duplicates.
    formatter = logging.Formatter(
        "%(levelname)s: %(asctime)s\n\n%(message)s\n")
    debug = logging.FileHandler("bulk_texting_log.txt")
    debug.setLevel(logging.DEBUG)
    debug.setFormatter(formatter)
    logger.addHandler(debug)
    logging.debug("Start of program.")

    # Set up the argparser.
    parser = argparse.ArgumentParser()
    parser.add_argument("-f", dest="numbers_file", required=True)
    parser.add_argument("-m", dest="message", required=True)
    parser.add_argument("--test", dest="test_number")
    parser.add_argument("nargs", nargs=argparse.REMAINDER)
    args = parser.parse_args()

    df = pandas.read_csv(args.numbers_file)
    target_numbers = set(df["Phone Number"].values)
    if args.test_number:
        target_numbers = [args.test_number]

    message_segments = math.ceil(len(args.message) / 160)
    total_cost = len(target_numbers) * message_segments * 0.0075

    client = Client(sensitive_settings.ACCT_SID, sensitive_settings.AUTH_TOKEN)

    logging.debug(
        f"Sending the message '{args.message}'\n to {len(target_numbers)}"
        f" numbers. This message is {message_segments} segments long. The"
        f" total cost for this text blast is {total_cost}.")
    logging.debug(f"target numbers:\n {(target_numbers)}")

    invalid_numbers = list()
    successful_messages = list()
    for number in target_numbers:
        number = str(number)
        number = re.sub(r"[^0-9]", "", number)
        try:
            message = client.messages.create(
                to=f"+1{number}",
                from_=sensitive_settings.FROM_NUMBER,
                body=args.message)
        except TwilioRestException:
            # One of the numbers was not valid. Log it, and continue.
            invalid_numbers.append(number)
            pass
        else:
            successful_messages.append(message)

    logging.debug(
        f"{len(successful_messages)} messages were sen to the numbers:\n"
        f"{target_numbers.difference(invalid_numbers)}.")
    logging.debug(f"The numbers: {invalid_numbers} are invalid.")


if __name__ == "__main__":
    main()
