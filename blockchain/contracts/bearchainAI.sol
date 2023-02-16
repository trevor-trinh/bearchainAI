// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import {ERC721, Strings} from '@openzeppelin/contracts/token/ERC721/ERC721.sol';
import {ERC721URIStorage} from '@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol';
import {Counters} from '@openzeppelin/contracts/utils/Counters.sol';
import {Ownable} from '@openzeppelin/contracts/access/Ownable.sol';
import {Base64} from '@openzeppelin/contracts/utils/Base64.sol';

// Deployed on Mumbai

contract bearchainAI is ERC721, ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    using Strings for uint256;

    Counters.Counter public _tokenIdCounter;

    mapping(uint256 => Fanfic) public tokenIdToFanfic;
    mapping(string => uint256) public authorToKudos;
    string[] public authors;

    // NFT base metadata
    string public external_url = 'https://example.com/explore/';
    string public image_data_url = 'https://example.com/api/?tokenId=';

    struct Fanfic {
        string title;
        string content;
        string fandom;
        Kudo[] kudos;
    }

    struct Kudo {
        string author;
        uint256 cites;
    }

    constructor() ERC721('bearchainAI', 'BCHAI') {}

    // Methods to change NFT base metadata after deployment if needed
    function setExternalUrl(string memory _url) public onlyOwner {
        external_url = _url;
    }

    function setImageDataUrl(string memory _url) public onlyOwner {
        image_data_url = _url;
    }

    // Returns total number of authors
    function totalAuthors() public view returns (uint256) {
        return authors.length;
    }

    /**
     * @dev mints fanfic nft and updates total number of cites for an author
     * @param title title of new fanfic
     * @param content main fanfic content
     * @param kudos list of referenced authors and number of fanfics cited
     */
    function mint(
        string memory title,
        string memory content,
        string memory fandom,
        Kudo[] memory kudos
    ) public {
        uint256 _____ = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(msg.sender, _____);

        // Set the new fanfic data
        __________.title = title;
        __________.content = content;
        __________.fandom = fandom;

        // Sets the kudos to the new fanfic
        for (uint i = 0; i < kudos.length; i++) {
            __________.kudos.push(_____);
        }

        // Sets the token URI
        _setTokenURI(_____, tokenURI(_____));

        // Updates the total number of citations for an author
        for (uint i = 0; i < kudos.length; i++) {
            Kudo memory _____ = _____;

            if (_____[__________] == 0) {
                _____.push(__________);
            }

            _____[__________] += __________;
        }
    }

    /**
     * @dev overrides default tokenURI and returns in base64 json format
     * @param tokenId returns uri for the specified tokenid
     */
    function tokenURI(
        uint256 tokenId
    ) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        require(
            _exists(tokenId),
            'ERC721Metadata: URI query for nonexistent token'
        );

        // OPTIONAL
        _____________________________________________;
        _____________________________________________;

        // must escape json strings when minting! else this will break
        bytes memory json = abi.encodePacked(
            '{',
            '"name": "Fanfic #',
            __________,
            ': ',
            __________,
            '",',
            '"description": "',
            __________,
            '",',
            '"external_url": "',
            __________,
            __________,
            '",',
            '"image_data": "',
            __________,
            __________,
            '",',
            '"attributes": [',
            __________,
            '{"trait_type" : "Fandom", "value": "',
            __________,
            '"}',
            ']'
            '}'
        );

        return
            string(
                abi.encodePacked(
                    'data:application/json;base64,',
                    Base64.encode(json)
                )
            );
    }

    /**
     * @dev creates json strin of kudos attributes
     * @param kudos list of all kudo structs
     */
    function _kudosToAttributeString(
        Kudo[] memory kudos
    ) internal pure returns (string memory) {
        string memory _____ = '';
        for (uint i = 0; i < _____; i++) {
            _____ = string.concat(
                _____,
                '{"trait_type": "',
                _____,
                '", "value": ',
                _____,
                '},'
            );
        }
        return _____;
    }

    // The following functions are overrides required by Solidity.
    function _burn(
        uint256 tokenId
    ) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }
}
